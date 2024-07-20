import { Car } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted py-8 md:py-12 w-full">
      <div className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-start gap-4">
          <Link href="#" className="flex items-center gap-2">
            <Car />
            <span className="font-bold text-lg">Car-en-bar</span>
          </Link>
          <p className="text-muted-foreground text-sm">Vacation ideas ? Travel to your destination now.</p>
        </div>
        <div className="grid gap-2">
          <h4 className="font-semibold">Product</h4>
          <Link href="#" className="text-sm hover:underline">
            Features
          </Link>
          <Link href="#" className="text-sm hover:underline">
            Pricing
          </Link>
          <Link href="#" className="text-sm hover:underline">
            Integrations
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="font-semibold">Company</h4>
          <Link href="#" className="text-sm hover:underline">
            About
          </Link>
          <Link href="#" className="text-sm hover:underline">
            Blog
          </Link>
          <Link href="#" className="text-sm hover:underline">
            Careers
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="font-semibold">Support</h4>
          <Link href="#" className="text-sm hover:underline">
            Help Center
          </Link>
          <Link href="#" className="text-sm hover:underline">
            Contact Us
          </Link>
          <Link href="#" className="text-sm hover:underline">
            Documentation
          </Link>
        </div>
      </div>
      <div className="container max-w-7xl mt-8 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground">&copy; 2024 Car-en-bar Inc. All rights reserved.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link href="#" className="text-sm hover:underline">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
