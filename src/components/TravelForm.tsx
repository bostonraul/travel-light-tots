
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
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

const TravelForm = () => {
  const [date, setDate] = useState<Date>();
  const [destination, setDestination] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !destination.trim()) {
      toast({
        title: "Missing information",
        description: "Please select both a date and destination",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Request submitted!",
      description: `We've received your request for ${destination} on ${format(date, 'PP')}. We'll be in touch soon!`,
    });
  };

  return (
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
        className="w-full bg-gradient-to-r from-tots-peach to-tots-yellow text-primary-foreground font-medium rounded-full py-6 text-lg transition-all hover:shadow-lg hover:-translate-y-1"
      >
        Tell Us Your Needs & Travel Light!
      </Button>
    </form>
  );
};

export default TravelForm;
