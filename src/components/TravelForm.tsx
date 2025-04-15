import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const TravelForm = () => {
  const [date, setDate] = useState<Date>();
  const [destination, setDestination] = useState('');
  const [ctaLabel, setCtaLabel] = useState('Tell us your needs'); // Default CTA
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const webhookUrl = "https://script.google.com/macros/s/AKfycbwn-uEohSTftq6lBsx8woI2b2Fc0wWeO6TiEWK8Cootxf7s7ad3btV37UwSReI8dlpbFg/exec"; // Replace this after generating new script

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !destination.trim()) {
      toast({
        title: "Missing information",
        description: "Please select both a date and destination",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          travel_date: format(date, 'PP'),
          destination,
          submitted_at: new Date().toISOString(),
          cta: ctaLabel,
        }),
      });

      console.log("Submitted with CTA:", ctaLabel);
      setShowDialog(true);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="travel-date" className="block text-sm font-medium text-gray-700">
            When are you traveling?
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="travel-date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Select your travel date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(d) => d < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
            Where are you headed?
          </label>
          <Input
            id="destination"
            placeholder="Enter your destination"
            className="w-full border-gray-300"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="grid gap-3">
          <Button
            type="submit"
            disabled={isLoading}
            onClick={() => setCtaLabel("Tell us your needs")}
            className="w-full bg-[#FFF6E9] text-black font-medium rounded-full py-6 text-lg transition-all hover:shadow-md"
          >
            {isLoading ? "Submitting..." : "Tell Us Your Needs & Travel Light!"}
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            onClick={() => setCtaLabel("Book your baby gear")}
            className="w-full bg-black text-white font-medium rounded-full py-6 text-lg transition-all hover:shadow-md"
          >
            {isLoading ? "Submitting..." : "Book Your Baby Gear Now"}
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            onClick={() => setCtaLabel("Plan your trip")}
            className="w-full bg-white border border-black text-black font-medium rounded-full py-6 text-lg transition-all hover:shadow-md"
          >
            {isLoading ? "Submitting..." : "Plan Your Trip Now"}
          </Button>
        </div>
      </form>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thanks for your interest!</DialogTitle>
            <DialogDescription className="pt-4 text-base">
              You caught us early. Please call us at <span className="font-bold">81213</span> to discuss your needs.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setShowDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TravelForm;
