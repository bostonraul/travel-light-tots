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

const CITIES = [
  "Hyderabad", "Kochi", "Bangalore", "New Delhi", "Mumbai",
  "Pune", "Gurgaon", "Chennai", "Goa", "Others"
];

const babyGearOptions = [
  { name: "Stroller", icon: "🚼" },
  { name: "Crib", icon: "🛏️" },
  { name: "CarSeat", icon: "🚗" },
  { name: "HighChair", icon: "🍽️" },
  { name: "Bassinet", icon: "🛌" },
  { name: "Others", icon: "➕" },
];

const DURATION_OPTIONS = [
  "5 hrs", "24 hrs", "1 week", "15 days", "1 month", "Custom Duration"
];

interface TravelFormProps {
  onSubmitSuccess?: () => void;
}

const TravelForm: React.FC<TravelFormProps> = ({ onSubmitSuccess }) => {
  const [date, setDate] = useState<Date>();
  const [city, setCity] = useState('');
  const [duration, setDuration] = useState(''); // <-- Added state for duration
  const [gearNeeded, setGearNeeded] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const webhookUrl = "https://script.google.com/macros/s/AKfycbwn-uEohSTftq6lBsx8woI2b2Fc0wWeO6TiEWK8Cootxf7s7ad3btV37UwSReI8dlpbFg/exec";

  const toggleGear = (item: string) => {
    setGearNeeded(prev =>
      prev.includes(item)
        ? prev.filter(g => g !== item)
        : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent, ctaType: string) => {
    e.preventDefault();

    if (!date || !city.trim() || !duration || gearNeeded.length === 0) {
      toast({
        title: "Missing information",
        description: "Please select date, city, duration, and gear needed.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const currentTime = new Date().toISOString();
      const params = new URLSearchParams({
        travel_date: format(date, 'PP'),
        city: city,
        duration: duration, // <-- Added duration here
        gear_needed: gearNeeded.join(', '),
        submitted_at: currentTime,
        cta: ctaType
      });

      const urlWithParams = `${webhookUrl}?${params.toString()}`;

      await fetch(urlWithParams, {
        method: "GET",
        mode: "no-cors",
      });

      setShowDialog(true);
      setDate(undefined);
      setCity('');
      setDuration(''); // <-- Clear duration
      setGearNeeded([]);

      toast({
        title: "Success!",
        description: "We've received your request.",
      });

      onSubmitSuccess?.();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setCalendarOpen(false);
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, "Tell us your needs")} className="space-y-6">
        {/* Date */}
        <div className="space-y-2">
          <label htmlFor="travel-date" className="block text-sm font-medium text-gray-700">
            When are you traveling?
          </label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                id="travel-date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50 h-12 px-4 text-sm md:text-base bg-[#fefcf8]",
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
                onSelect={handleDateSelect}
                initialFocus
                disabled={(d) => d < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* City Dropdown */}
        <div className="space-y-2">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Where are you headed?
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full h-12 px-4 text-sm md:text-base text-muted-foreground font-normal bg-[#fefcf8] border border-gray-300 rounded-md shadow-sm appearance-none"
            required
          >
            <option value="">Select your destination</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Duration Dropdown */}
        <div className="space-y-2">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            For how long do you need the gear?
          </label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full h-12 px-4 text-sm md:text-base text-muted-foreground font-normal bg-[#fefcf8] border border-gray-300 rounded-md shadow-sm appearance-none"
            required
          >
            <option value="">Select duration</option>
            {DURATION_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Gear Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Which baby gear do you need?
          </label>
          <div className="grid grid-cols-2 gap-2">
          {babyGearOptions.map((gear) => (
  <label
    key={gear.name}
    className="flex items-center space-x-3 border border-gray-200 rounded-lg px-4 py-3 bg-white hover:shadow-md transition cursor-pointer"
  >
    <input
      type="checkbox"
      value={gear.name}
      checked={gearNeeded.includes(gear.name)}
      onChange={() => toggleGear(gear.name)}
      className="h-5 w-5 text-primary accent-primary"
    />
    <span className="flex items-center text-base">
      <span className="text-xl mr-2">{gear.icon}</span>
      {gear.name}
    </span>
  </label>
))}
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-tots-peach to-tots-yellow text-primary-foreground font-medium rounded-full py-6 text-lg transition-all hover:shadow-lg hover:-translate-y-1 relative"
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

      {/* Confirmation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thanks for your interest!</DialogTitle>
            <DialogDescription className="pt-4 text-base">
            You've caught us at an exciting stage — we’re building a trusted network of local families to provide you with the best baby gear experience.
            At the moment, we don't have the requested gear available in your city, but we are growing fast!
            One of our experts will personally reach out to you as soon as we find a match.
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
