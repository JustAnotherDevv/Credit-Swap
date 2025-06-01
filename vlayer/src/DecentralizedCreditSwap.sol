// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title DecentralizedCreditSwap
 * @dev Roles:
 * - Asset Holders: Create swap requests and manage funds
 * - Proxy Buyers: Submit proposals and execute swaps
 * - Platform Manager: Receives platform fees
 */
contract DecentralizedCreditSwap {
    // State variables
    address public platformManager;
    uint256 public platformFeePercentage = 250; // 2.5% for now
    uint256 public requestCounter;
    
    // Enums
    enum RequestStatus {
        Created,
        ProposalAccepted,
        InProgress,
        Finalized,
        Cancelled
    }
    
    enum ProposalStatus {
        Pending,
        Accepted,
        Rejected
    }
    
    // Structs
    struct Request {
        uint256 id;
        address assetHolder;
        uint256 amount;
        uint256 unlockedAmount;
        uint256 startDate;
        uint256 deadline;
        string metadata;
        RequestStatus status;
        address acceptedProxyBuyer;
        uint256 acceptedProposalId;
        uint256 totalSteps;
        uint256 completedSteps;
        uint256 createdAt;
    }
    
    struct Proposal {
        uint256 id;
        uint256 requestId;
        address proxyBuyer;
        uint256 feeAmount;
        string proposalDetails;
        ProposalStatus status;
        uint256 createdAt;
    }
    
    struct ProofSubmission {
        uint256 stepNumber;
        string proofHash;
        uint256 submittedAt;
        bool fundsUnlocked;
    }
    
    // Mappings
    mapping(uint256 => Request) public requests;
    mapping(uint256 => Proposal[]) public requestProposals;
    mapping(uint256 => mapping(uint256 => ProofSubmission)) public requestProofs;
    mapping(address => uint256[]) public userRequests;
    mapping(address => uint256[]) public proxyBuyerProposals;
    
    // Events
    event RequestCreated(uint256 indexed requestId, address indexed assetHolder, uint256 amount);
    event ProposalSubmitted(uint256 indexed requestId, uint256 proposalId, address indexed proxyBuyer);
    event ProposalAccepted(uint256 indexed requestId, uint256 proposalId, address indexed proxyBuyer);
    event ProofSubmitted(uint256 indexed requestId, uint256 stepNumber, string proofHash);
    event FundsUnlocked(uint256 indexed requestId, uint256 stepNumber, uint256 amount);
    event RequestFinalized(uint256 indexed requestId, uint256 platformFee, uint256 proxyBuyerFee);
    event RequestCancelled(uint256 indexed requestId);
    
    // Modifiers
    modifier onlyPlatformManager() {
        require(msg.sender == platformManager, "Only platform manager");
        _;
    }
    
    modifier onlyAssetHolder(uint256 _requestId) {
        require(requests[_requestId].assetHolder == msg.sender, "Only asset holder");
        _;
    }
    
    modifier onlyAcceptedProxyBuyer(uint256 _requestId) {
        require(requests[_requestId].acceptedProxyBuyer == msg.sender, "Only accepted proxy buyer");
        _;
    }
    
    modifier requestExists(uint256 _requestId) {
        require(requests[_requestId].id != 0, "Request does not exist");
        _;
    }
    
    constructor() {
        platformManager = msg.sender;
    }
    
    // Write Functions
    
    /**
     * @dev Create a new credit swap request
     * @param _amount Total amount for the swap
     * @param _startDate Start date for the swap
     * @param _deadline Deadline for completing the swap
     * @param _metadata Additional metadata for the request
     * @param _totalSteps Total number of steps/milestones
     */
    function createRequest(
        uint256 _amount,
        uint256 _startDate,
        uint256 _deadline,
        string memory _metadata,
        uint256 _totalSteps
    ) external payable {
        require(_amount > 0, "Amount must be greater than 0");
        require(msg.value == _amount, "Sent value must equal amount");
        require(_startDate >= block.timestamp, "Start date must be in future");
        require(_deadline > _startDate, "Deadline must be after start date");
        require(_totalSteps > 0, "Must have at least one step");
        
        requestCounter++;
        uint256 requestId = requestCounter;
        
        Request storage newRequest = requests[requestId];
        newRequest.id = requestId;
        newRequest.assetHolder = msg.sender;
        newRequest.amount = _amount;
        newRequest.startDate = _startDate;
        newRequest.deadline = _deadline;
        newRequest.metadata = _metadata;
        newRequest.status = RequestStatus.Created;
        newRequest.totalSteps = _totalSteps;
        newRequest.createdAt = block.timestamp;
        
        userRequests[msg.sender].push(requestId);
        
        emit RequestCreated(requestId, msg.sender, _amount);
    }
    
    /**
     * @dev Submit a proposal for a credit swap request
     * @param _requestId ID of the request
     * @param _feeAmount Fee amount requested by proxy buyer
     * @param _proposalDetails Details of the proposal
     */
    function submitProposal(
        uint256 _requestId,
        uint256 _feeAmount,
        string memory _proposalDetails
    ) external requestExists(_requestId) {
        Request storage request = requests[_requestId];
        require(request.status == RequestStatus.Created, "Request not accepting proposals");
        require(request.assetHolder != msg.sender, "Asset holder cannot submit proposal");
        require(block.timestamp < request.deadline, "Request deadline passed");
        
        uint256 proposalId = requestProposals[_requestId].length;
        
        Proposal memory newProposal = Proposal({
            id: proposalId,
            requestId: _requestId,
            proxyBuyer: msg.sender,
            feeAmount: _feeAmount,
            proposalDetails: _proposalDetails,
            status: ProposalStatus.Pending,
            createdAt: block.timestamp
        });
        
        requestProposals[_requestId].push(newProposal);
        proxyBuyerProposals[msg.sender].push(_requestId);
        
        emit ProposalSubmitted(_requestId, proposalId, msg.sender);
    }
    
    /**
     * @dev Accept a proposal for a credit swap request
     * @param _requestId ID of the request
     * @param _proposalId ID of the proposal to accept
     */
    function acceptProposal(
        uint256 _requestId,
        uint256 _proposalId
    ) external requestExists(_requestId) onlyAssetHolder(_requestId) {
        Request storage request = requests[_requestId];
        require(request.status == RequestStatus.Created, "Request not in correct state");
        require(_proposalId < requestProposals[_requestId].length, "Invalid proposal ID");
        
        Proposal storage proposal = requestProposals[_requestId][_proposalId];
        require(proposal.status == ProposalStatus.Pending, "Proposal not pending");
        
        request.status = RequestStatus.ProposalAccepted;
        request.acceptedProxyBuyer = proposal.proxyBuyer;
        request.acceptedProposalId = _proposalId;
        
        proposal.status = ProposalStatus.Accepted;
        
        for (uint256 i = 0; i < requestProposals[_requestId].length; i++) {
            if (i != _proposalId && requestProposals[_requestId][i].status == ProposalStatus.Pending) {
                requestProposals[_requestId][i].status = ProposalStatus.Rejected;
            }
        }
        
        emit ProposalAccepted(_requestId, _proposalId, proposal.proxyBuyer);
    }
    
    /**
     * @dev Submit proof for a step in the credit swap
     * @param _requestId ID of the request
     * @param _stepNumber Step number for the proof
     * @param _proofHash Hash or identifier of the proof
     */
    function submitProof(
        uint256 _requestId,
        uint256 _stepNumber,
        string memory _proofHash
    ) external requestExists(_requestId) onlyAcceptedProxyBuyer(_requestId) {
        Request storage request = requests[_requestId];
        require(
            request.status == RequestStatus.ProposalAccepted || 
            request.status == RequestStatus.InProgress,
            "Request not in correct state"
        );
        require(block.timestamp >= request.startDate, "Swap has not started yet");
        require(block.timestamp < request.deadline, "Deadline has passed");
        require(_stepNumber > 0 && _stepNumber <= request.totalSteps, "Invalid step number");
        require(_stepNumber == request.completedSteps + 1, "Steps must be completed in order");
        require(bytes(_proofHash).length > 0, "Proof hash cannot be empty");
        
        ProofSubmission storage proof = requestProofs[_requestId][_stepNumber];
        require(proof.submittedAt == 0, "Proof already submitted for this step");
        
        proof.stepNumber = _stepNumber;
        proof.proofHash = _proofHash;
        proof.submittedAt = block.timestamp;
        
        if (request.status == RequestStatus.ProposalAccepted) {
            request.status = RequestStatus.InProgress;
        }
        
        emit ProofSubmitted(_requestId, _stepNumber, _proofHash);
    }
    
    /**
     * @dev Unlock funds for a completed step
     * @param _requestId ID of the request
     * @param _stepNumber Step number to unlock funds for
     */
    function unlockFunds(
        uint256 _requestId,
        uint256 _stepNumber
    ) external requestExists(_requestId) onlyAssetHolder(_requestId) {
        Request storage request = requests[_requestId];
        require(request.status == RequestStatus.InProgress, "Request not in progress");
        require(_stepNumber > 0 && _stepNumber <= request.totalSteps, "Invalid step number");
        
        ProofSubmission storage proof = requestProofs[_requestId][_stepNumber];
        require(proof.submittedAt > 0, "Proof not submitted for this step");
        require(!proof.fundsUnlocked, "Funds already unlocked for this step");
        
        uint256 stepAmount = request.amount / request.totalSteps;
        
        proof.fundsUnlocked = true;
        request.unlockedAmount += stepAmount;
        request.completedSteps++;
        
        payable(request.acceptedProxyBuyer).transfer(stepAmount);
        
        emit FundsUnlocked(_requestId, _stepNumber, stepAmount);
    }
    
    /**
     * @dev Finalize the credit swap request
     * @param _requestId ID of the request to finalize
     */
    function finalizeRequest(
        uint256 _requestId
    ) external requestExists(_requestId) onlyAssetHolder(_requestId) {
        Request storage request = requests[_requestId];
        require(request.status == RequestStatus.InProgress, "Request not in progress");
        require(request.completedSteps == request.totalSteps, "All steps not completed");
        
        Proposal storage acceptedProposal = requestProposals[_requestId][request.acceptedProposalId];
        
        uint256 remainingAmount = request.amount - request.unlockedAmount;
        uint256 platformFee = (acceptedProposal.feeAmount * platformFeePercentage) / 10000;
        uint256 proxyBuyerFee = acceptedProposal.feeAmount - platformFee;
        
        require(remainingAmount >= acceptedProposal.feeAmount, "Insufficient funds for fees");
        
        request.status = RequestStatus.Finalized;
        
        if (platformFee > 0) {
            payable(platformManager).transfer(platformFee);
        }
        if (proxyBuyerFee > 0) {
            payable(request.acceptedProxyBuyer).transfer(proxyBuyerFee);
        }
        
        uint256 refund = remainingAmount - acceptedProposal.feeAmount;
        if (refund > 0) {
            payable(request.assetHolder).transfer(refund);
        }
        
        emit RequestFinalized(_requestId, platformFee, proxyBuyerFee);
    }
    
    /**
     * @dev Cancel a request (only before proposal accepted)
     * @param _requestId ID of the request to cancel
     */
    function cancelRequest(
        uint256 _requestId
    ) external requestExists(_requestId) onlyAssetHolder(_requestId) {
        Request storage request = requests[_requestId];
        require(request.status == RequestStatus.Created, "Can only cancel before accepting proposal");
        
        request.status = RequestStatus.Cancelled;
        
        payable(request.assetHolder).transfer(request.amount);
        
        emit RequestCancelled(_requestId);
    }
    
    // View Functions
    
    /**
     * @dev Get all requests
     * @return Array of all request IDs
     */
    function getRequests() external view returns (uint256[] memory) {
        uint256[] memory allRequestIds = new uint256[](requestCounter);
        for (uint256 i = 1; i <= requestCounter; i++) {
            allRequestIds[i - 1] = i;
        }
        return allRequestIds;
    }
    
    /**
     * @dev Get specific request details
     * @param _requestId ID of the request
     * @return Request struct
     */
    function getRequest(uint256 _requestId) external view returns (Request memory) {
        return requests[_requestId];
    }
    
    /**
     * @dev Get all proposals for a request
     * @param _requestId ID of the request
     * @return Array of proposals
     */
    function getRequestProposals(uint256 _requestId) external view returns (Proposal[] memory) {
        return requestProposals[_requestId];
    }
    
    /**
     * @dev Get specific proposal details
     * @param _requestId ID of the request
     * @param _proposalId ID of the proposal
     * @return Proposal struct
     */
    function getProposal(uint256 _requestId, uint256 _proposalId) external view returns (Proposal memory) {
        require(_proposalId < requestProposals[_requestId].length, "Invalid proposal ID");
        return requestProposals[_requestId][_proposalId];
    }
    
    /**
     * @dev Get proof submission for a specific step
     * @param _requestId ID of the request
     * @param _stepNumber Step number
     * @return ProofSubmission struct
     */
    function getProofSubmission(uint256 _requestId, uint256 _stepNumber) external view returns (ProofSubmission memory) {
        return requestProofs[_requestId][_stepNumber];
    }
    
    /**
     * @dev Get requests created by a specific user
     * @param _user Address of the user
     * @return Array of request IDs
     */
    function getUserRequests(address _user) external view returns (uint256[] memory) {
        return userRequests[_user];
    }
    
    /**
     * @dev Get proposals submitted by a proxy buyer
     * @param _proxyBuyer Address of the proxy buyer
     * @return Array of request IDs where proposals were submitted
     */
    function getProxyBuyerProposals(address _proxyBuyer) external view returns (uint256[] memory) {
        return proxyBuyerProposals[_proxyBuyer];
    }
    
    // Admin Functions
    
    /**
     * @dev Update platform fee percentage (only platform manager)
     * @param _newFeePercentage New fee percentage in basis points
     */
    function updatePlatformFee(uint256 _newFeePercentage) external onlyPlatformManager {
        require(_newFeePercentage <= 1000, "Fee cannot exceed 10%");
        platformFeePercentage = _newFeePercentage;
    }
    
    /**
     * @dev Transfer platform manager role
     * @param _newManager Address of the new platform manager
     */
    function transferPlatformManager(address _newManager) external onlyPlatformManager {
        require(_newManager != address(0), "Invalid address");
        platformManager = _newManager;
    }
}