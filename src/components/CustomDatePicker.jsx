import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export default function CustomDatePicker({ value, onChange, accentColor = 'emerald' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync value prop changes
  useEffect(() => {
    if (value) {
      const d = new Date(value);
      setViewDate(d);
    }
  }, [value]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Helper to format date as YYYY-MM-DD (local timezone safe)
  const formatDateString = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Get days in month
  const getDaysInMonth = (y, m) => {
    return new Date(y, m + 1, 0).getDate();
  };

  // Get day of week of the first day of the month
  const getFirstDayOfMonth = (y, m) => {
    return new Date(y, m, 1).getDay();
  };

  const daysInCurrentMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  // Prev month filler days
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  const prevMonthDays = [];
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    prevMonthDays.push({
      day: daysInPrevMonth - i,
      month: prevMonth,
      year: prevYear,
      isCurrentMonth: false
    });
  }

  // Current month days
  const currentMonthDays = [];
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    currentMonthDays.push({
      day: i,
      month,
      year,
      isCurrentMonth: true
    });
  }

  // Next month filler days (grid is 7 cols x 6 rows = 42 cells)
  const totalCells = 42;
  const nextMonthDays = [];
  const remainingCells = totalCells - (prevMonthDays.length + currentMonthDays.length);
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  for (let i = 1; i <= remainingCells; i++) {
    nextMonthDays.push({
      day: i,
      month: nextMonth,
      year: nextYear,
      isCurrentMonth: false
    });
  }

  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleSelectDay = (dayObj) => {
    const selected = new Date(dayObj.year, dayObj.month, dayObj.day);
    onChange(formatDateString(selected));
    setIsOpen(false);
  };

  const isToday = (dayObj) => {
    const today = new Date();
    return today.getDate() === dayObj.day &&
      today.getMonth() === dayObj.month &&
      today.getFullYear() === dayObj.year;
  };

  const isSelected = (dayObj) => {
    if (!value) return false;
    const valDate = new Date(value);
    return valDate.getDate() === dayObj.day &&
      valDate.getMonth() === dayObj.month &&
      valDate.getFullYear() === dayObj.year;
  };

  const isPast = (dayObj) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const checkDate = new Date(dayObj.year, dayObj.month, dayObj.day);
    return checkDate < today;
  };

  // UI class styling definitions based on accent color
  const accentClasses = {
    emerald: {
      borderFocus: 'focus:border-brand-emerald border-brand-emerald/20',
      textAccent: 'text-brand-emerald',
      bgAccent: 'bg-brand-emerald text-dark-bg font-bold shadow-emerald',
      hoverAccent: 'hover:bg-brand-emerald/10 hover:text-brand-emerald border-brand-emerald/30',
      glowAccent: 'glow-emerald',
      ringAccent: 'ring-brand-emerald/20'
    },
    cyan: {
      borderFocus: 'focus:border-brand-cyan border-brand-cyan/20',
      textAccent: 'text-brand-cyan',
      bgAccent: 'bg-brand-cyan text-dark-bg font-bold shadow-cyan',
      hoverAccent: 'hover:bg-brand-cyan/10 hover:text-brand-cyan border-brand-cyan/30',
      glowAccent: 'glow-cyan',
      ringAccent: 'ring-brand-cyan/20'
    }
  }[accentColor] || accentClasses.emerald;

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Date Input Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between rounded-lg border border-dark-border bg-dark-bg px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300 text-left hover:border-slate-700 ${isOpen ? accentClasses.borderFocus : ''}`}
      >
        <span className={value ? 'text-white' : 'text-slate-500'}>
          {value ? new Date(value).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'Select target date...'}
        </span>
        <CalendarIcon className={`h-4 w-4 ${value ? accentClasses.textAccent : 'text-slate-500'} transition-colors`} />
      </button>

      {/* Premium Popover Calendar */}
      {isOpen && (
        <div className="absolute left-0 mt-2 z-50 w-[300px] sm:w-[320px] rounded-xl border border-dark-border bg-dark-card/95 backdrop-blur-md p-4 shadow-2xl glass animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Header (Month & Year + Nav) */}
          <div className="flex items-center justify-between mb-4 border-b border-dark-border/40 pb-3">
            <span className="text-sm font-bold text-white font-mono tracking-wider">
              {months[month].toUpperCase()} {year}
            </span>
            <div className="flex space-x-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1.5 rounded-lg border border-dark-border/60 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg border border-dark-border/60 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Weekday Grid Headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {daysOfWeek.map((day, idx) => (
              <span key={idx} className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {allDays.map((dayObj, idx) => {
              const selected = isSelected(dayObj);
              const today = isToday(dayObj);
              const past = isPast(dayObj);
              const isCurr = dayObj.isCurrentMonth;

              let buttonClass = 'relative text-xs py-2 rounded-lg transition-all duration-200 flex flex-col items-center justify-center border ';

              if (past) {
                // Past days: disabled and muted
                buttonClass += 'border-transparent text-slate-700 cursor-not-allowed';
              } else if (selected) {
                // Selected date: bright brand color, glowing
                buttonClass += `border-transparent ${accentClasses.bgAccent} ${accentClasses.glowAccent}`;
              } else if (today) {
                // Today: highlighted border
                buttonClass += `border-${accentColor === 'emerald' ? 'brand-emerald/50' : 'brand-cyan/50'} text-${accentColor}-400 font-bold bg-white/5`;
              } else if (!isCurr) {
                // Other month days: semi-transparent
                buttonClass += 'border-transparent text-slate-600 hover:bg-white/5 hover:text-slate-300';
              } else {
                // Regular active current month day
                buttonClass += 'border-transparent text-slate-300 hover:bg-white/5 hover:text-white hover:border-slate-800';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={past}
                  onClick={() => handleSelectDay(dayObj)}
                  className={buttonClass}
                >
                  <span>{dayObj.day}</span>
                  {today && !selected && (
                    <span className={`absolute bottom-1 w-1 h-1 rounded-full ${accentColor === 'emerald' ? 'bg-brand-emerald' : 'bg-brand-cyan'}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
