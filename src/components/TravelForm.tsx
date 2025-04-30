import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const CITIES = ["Hyderabad", "Kochi", "Bangalore", "New Delhi", "Mumbai", "Pune", "Gurgaon", "Chennai", "Goa", "Others"];
const DURATION_OPTIONS = ["<24 hrs", "1-3 days", "1 week", "1-2 weeks", "1 month", ">1 month"];
const babyGearOptions = [
  { name: "Stroller", icon: "/icons/stroller.png" },
  { name: "Crib", icon: "/icons/crib.png" },
  { name: "CarSeat", icon: "/icons/bayseat.png" },
  { name: "HighChair", icon: "/icons/highchair.png" },
  { name: "Bassinet", icon: "/icons/bassinets.png" },
  { name: "Others", icon: "/icons/others.png" },
];

interface TravelFormProps {
  onSubmitSuccess?: () => void;
}

const TravelForm: React.FC<TravelFormProps> = ({ onSubmitSuccess }) => {
  const [date, setDate] = useState<Date>();
  const [city, setCity] = useState('');
  const [duration, setDuration] = useState('');
  const [gearNeeded, setGearNeeded] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);

  const webhookUrl = "https://script.google.com/macros/s/AKfycbwn-uEohSTftq6lBsx8woI2b2Fc0wWeO6TiEWK8Cootxf7s7ad3btV37UwSReI8dlpbFg/exec";

  const toggleGear = (item: string) => {
    setGearNeeded(prev => prev.includes(item) ? prev.filter(g => g !== item) : [...prev, item]);
  };

  const handleSubmit = async (e: React.FormEvent, ctaType: string) => {
    e.preventDefault();
    if (!date || !city.trim() || !duration || gearNeeded.length === 0) {
      toast({ title: "Missing information", description: "Please fill all fields.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        travel_date: format(date, 'PP'),
        city,
        duration,
        gear_needed: gearNeeded.join(', '),
        submitted_at: new Date().toISOString(),
        cta: ctaType,
      });

      await fetch(`${webhookUrl}?${params.toString()}`, { method: "GET", mode: "no-cors" });

      setShowDialog(true);
      setDate(undefined);
      setCity('');
      setDuration('');
      setGearNeeded([]);
    } catch (error) {
      console.error("Submission error:", error);
      toast({ title: "Error", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSubmit = async () => {
    if (!phoneNumber.trim()) {
      toast({ title: "Missing Phone Number", description: "Please enter your number.", variant: "destructive" });
      return;
    }

    try {
      const phoneParams = new URLSearchParams({
        phone: phoneNumber,
        city: city || "Not Provided",
        submitted_at: new Date().toISOString(),
        cta: "PhoneNumberAfterThankYou",
      });

      await fetch(`${webhookUrl}?${phoneParams.toString()}`, { method: "GET", mode: "no-cors" });
      toast({ title: "Thank you!", description: "We will reach out when a match is available." });
      setShowDialog(false);
      setPhoneNumber('');
    } catch (error) {
      console.error("Phone number submission error:", error);
      toast({ title: "Error", description: "Could not submit number. Try again.", variant: "destructive" });
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setCalendarOpen(false);
  };

  return (
    <>
      {/* Main Form */}
      <form onSubmit={(e) => handleSubmit(e, "Tell us your needs")} className="space-y-6">
        {/* Travel Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">When are you traveling?</label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full justify-start text-left font-normal h-12 bg-[#fefcf8]", !date && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Select your travel date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus disabled={(d) => d < new Date()} />
            </PopoverContent>
          </Popover>
        </div>

        {/* City Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Where are you headed?</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full justify-start text-left font-normal border border-gray-300 hover:bg-gray-50 h-12 px-4 text-sm md:text-base bg-[#fefcf8] rounded-md text-muted-foreground appearance-none"
            required
          >

            <option value="">Select your destination</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">For how long?</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full justify-start text-left font-normal border border-gray-300 hover:bg-gray-50 h-12 px-4 text-sm md:text-base bg-[#fefcf8] rounded-md text-muted-foreground appearance-none"
            required
          >

            <option value="">Select duration</option>
            {DURATION_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {/* Gear Options */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Which baby gear?</label>
          <div className="grid grid-cols-2 gap-2">
            {babyGearOptions.map((gear) => (
              <label key={gear.name} className="flex items-center space-x-3 border border-gray-200 rounded-lg px-4 py-3 bg-white hover:shadow-md transition cursor-pointer">
                <input type="checkbox" value={gear.name} checked={gearNeeded.includes(gear.name)} onChange={() => toggleGear(gear.name)} className="h-5 w-5 text-primary" />
                <span className="flex items-center text-base">
                  <img src={gear.icon} alt={gear.name} className="h-5 w-5 mr-2 object-contain" />
                  {gear.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-tots-peach to-tots-yellow text-white font-medium rounded-full py-6 text-lg hover:shadow-lg hover:-translate-y-1">
          {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Tell Us Your Needs & Travel Light!"}
        </Button>
      </form>

      {/* Thank You Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thanks for your interest!</DialogTitle>
            <DialogDescription className="pt-4 text-base space-y-2">
              <p>You've caught us at an exciting stage — we’re building a trusted network of local families to provide you with the best baby gear experience.</p>
              <p>With the vacation season upon us, we're actively working to arrange the best baby gear for your little ones!</p>
              <p>One of our experts will personally reach out to you as soon as we find a match.</p>
              <div className="space-y-2 pt-4">
                <label className="text-sm text-gray-700 font-medium">Share your phone number:</label>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border-gray-300 h-12 text-base"
                />
                <Button onClick={handlePhoneSubmit} className="w-full mt-2 bg-black text-white">
                  Submit Number
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TravelForm;
