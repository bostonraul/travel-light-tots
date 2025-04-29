import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TinyTravellerLightboxProps {
  open: boolean;
  onClose: () => void;
}

const TinyTravellerLightbox: React.FC<TinyTravellerLightboxProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">TinyTravellers – A ToyBuddy Initiative</DialogTitle>
          <DialogDescription className="pt-4 text-base text-center">
          We are a growing community dedicated to making travel easier for parents with young children.
At TinyTravellers, we partner with local families to source premium baby gear and provide it to traveling parents — safely, conveniently, and without the hassle.
Whether you're visiting a new city or planning a family vacation, we ensure you have access to trusted, high-quality gear exactly when and where you need it.<br />
            List your premium baby gear with TinyTraveller and earn while making a difference!
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-6">
        <Button variant="default" className="w-full" onClick={() => window.open('https://rentdonate.tinytravellers.online', '_blank')}>
            Become a Provider
          </Button>
          <Button variant="default" className="w-full" onClick={() => window.open('https://www.toybuddyshop.in', '_blank')}>
            Visit ToyBuddyShop
          </Button>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TinyTravellerLightbox;
