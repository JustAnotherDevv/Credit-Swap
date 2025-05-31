import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted px-4 py-10 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
        The Site <br />
        <span className="text-primary">social media growth</span>
      </h1>
      <p className="max-w-xl mx-auto text-muted-foreground mb-6">
        Discover the power of automation and data-driven suggestions for social
        media enhancement.
      </p>
      <Button className="gap-2 text-md">
        Get Started <ArrowRight className="w-4 h-4" />
      </Button>

      <div className="mt-16 flex flex-col items-center gap-6">
        <img
          src="/mock-dashboard.png"
          alt="Analytics Dashboard"
          className="rounded-xl shadow-xl w-full max-w-4xl"
        />
        <p className="text-sm text-muted-foreground">
          Trusted by top companies like Microsoft, Google, Amazon, and Netflix.
        </p>
      </div>
    </div>
  );
}
