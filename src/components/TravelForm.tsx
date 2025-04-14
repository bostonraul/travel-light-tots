
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
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const webhookUrl = "https://script.google.com/macros/s/AKfycbwn-uEohSTftq6lBsx8woI2b2Fc0wWeO6TiEWK8Cootxf7s7ad3btV37UwSReI8dlpbFg/exec"; // replace with your actual webhook URL

  // For development/demo purposes, allow setting a webhook URL
  // In production, this would be hardcoded or stored securely
 // const [showWebhookConfig, setShowWebhookConfig] = useState(false);

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
      // Only attempt to send to Zapier if webhook URL is provided
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors", // Handling CORS for Zapier webhook
          body: JSON.stringify({
            travel_date: format(date, 'PP'),
            destination: destination,
            submitted_at: new Date().toISOString()
          }),
        });
        
        console.log("Data sent to webhook:", {
          travel_date: format(date, 'PP'),
          destination: destination
        });
      } else {
        // If no webhook URL, just log the data that would be sent
        console.log("Demo mode - would send:", {
          travel_date: format(date, 'PP'),
          destination: destination
        });
      }
      
      // Show success dialog with contact information
      setShowDialog(true);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
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
                disabled={(date) => date < new Date()}
                className="pointer-events-auto"
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
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-tots-peach to-tots-yellow text-primary-foreground font-medium rounded-full py-6 text-lg transition-all hover:shadow-lg hover:-translate-y-1"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Tell Us Your Needs & Travel Light!"
          )}
        </Button>
        
        
      </form>
      
      {/* Success Dialog with Contact Information */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thanks for your interest!</DialogTitle>
            <DialogDescription className="pt-4 text-base">
              You caught us early, as we are setting up this service for you. 
              Please call us at <span className="font-bold">81213</span> to discuss your needs.
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
