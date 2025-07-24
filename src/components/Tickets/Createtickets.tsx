import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ticketicon from '../../assets/icons/Tickets/back.png';
import ticketsicon from '../../assets/icons/Tickets/image.png';
import uploadicon from '../../assets/icons/Tickets/Frame 5226.png';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FONTS } from "@/constants/uiConstants";
import { Button } from '../ui/button';

export const Createtickets = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [problem, setProblem] = useState('');
  const [query, setQuery] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({
    problem: '',
    query: '',
    description: '',
    image: '',
  });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    } else {
      setPreview(null);
    }
  };

  const handleConfirm = () => {
    const newErrors = {
      problem: problem ? '' : 'Please select a problem.',
      query: query.trim() ? '' : 'Please enter a query.',
      description: description.trim() ? '' : 'Please enter a description.',
      image: preview ? '' : 'Please upload an image.',
    };
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(err => err !== '');
    if (!hasError) {
      alert('Ticket created successfully!');
      navigate('/tickets');
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <img
          src={ticketicon}
          alt="Back"
          className="cursor-pointer mt-2"
          onClick={() => navigate('/tickets')}
        />
        <h1 className="text-2xl font-semibold" style={{ ...FONTS.heading_01 }}>
         Create Ticket For Your Problem
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/2 bg-[#ebeff3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]">
          <CardHeader>
            <CardTitle className="text-base !text-black font-medium" style={{ ...FONTS.para_01, fontSize: '15px' }}>
              Select Your Problem
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Select onValueChange={setProblem}>
              <SelectTrigger className="w-full h-12 focus-visible:ring-0 border-none shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className="bg-[#ebeff3] !text-black" style={{ ...FONTS.para_01, fontSize: '15px' }}>
                <SelectItem value="attendance" className="!bg-[#ebeff3] !text-black">
                  Attendance issue
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.problem && <p className="text-red-500 text-sm">{errors.problem}</p>}

            <div>
              <label className="text-sm font-medium !text-black mb-2 block" style={{ ...FONTS.para_01, fontSize: '15px' }}>
                Query
              </label>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full mt-2 h-12 bg-[#ebeff3] focus-visible:ring-0 border-none shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none"
              />
              {errors.query && <p className="text-red-500 text-sm">{errors.query}</p>}
            </div>

            <div>
              <label className="text-sm !text-black font-medium block" style={{ ...FONTS.para_01, fontSize: '15px' }}>
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-2 h-24 p-3 resize-none rounded-md bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] focus:outline-none text-sm text-black-700"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div>
              <label className="text-sm !text-black font-medium" style={{ ...FONTS.para_01, fontSize: '15px' }}>
                Attachment
              </label>
              <div
                className="mt-2 h-32 p-6 rounded-xl flex flex-col items-center justify-center text-center bg-[#ebeff3]
                shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
              >
                <img
                  src={preview || uploadicon}
                  alt="Upload"
                  className="w-10 h-10 object-contain cursor-pointer"
                  onClick={handleUploadClick}
                />
                <p className="text-sm mt-2 !text-gray-600" style={{ ...FONTS.para_01, fontSize: '13px' }}>
                  {preview ? "Image Uploaded" : "Upload File"}
                </p>
              </div>
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="w-full flex justify-end gap-4 mt-8">
              <Button
                onClick={() => navigate('/tickets')}
                className="px-4 py-2 rounded-md cursor-pointer !text-black !bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
                style={{ ...FONTS.para_01, fontSize: '15px' }}
              >
                Cancel Ticket
              </Button>
              <Button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-sm bg-gradient-to-l cursor-pointer from-[#7B00FF] to-[#B200FF] !text-white 
                shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] 
                hover:opacity-90 transition"
                style={{ ...FONTS.para_01, fontSize: '15px' }}
              >
                Confirm Ticket
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full md:w-1/2 flex items-center justify-center p-6 bg-[#ebeff3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]">
          <img
            src={ticketsicon}
            alt="Ticket"
            className="w-2/3 max-w-xs object-contain"
          />
        </Card>
      </div>
    </div>
  );
};
