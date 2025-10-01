"use client";
import React, { useState, useRef } from "react";
import {
  Upload,
  Image,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link,
  Palette,
  X,
} from "lucide-react";
import { CampaignData } from "@/types/campaign";

interface Step3StoryProps {
  data: CampaignData;
  updateData: (updates: Partial<CampaignData>) => void;
  errors: Record<string, string>;
}

const Step3Story: React.FC<Step3StoryProps> = ({
  data,
  updateData,
  errors,
}) => {
  const [coverPhoto, setCoverPhoto] = useState<File | string | null>(
    data.coverPhoto || null
  );
  const [showColorPicker, setShowColorPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverPhoto(file);
      updateData({ coverPhoto: file });
    }
  };

  const removeImage = () => {
    setCoverPhoto(null);
    updateData({ coverPhoto: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getImagePreview = () => {
    if (coverPhoto instanceof File) {
      return URL.createObjectURL(coverPhoto);
    }
    return coverPhoto;
  };

  const formatText = (command: string) => {
    document.execCommand(command, false);
  };

  const toolbarButtons = [
    { icon: Bold, command: "bold", title: "Bold" },
    { icon: Italic, command: "italic", title: "Italic" },
    { icon: Underline, command: "underline", title: "Underline" },
    { icon: Strikethrough, command: "strikeThrough", title: "Strikethrough" },
    { icon: List, command: "insertUnorderedList", title: "Unordered list" },
    { icon: ListOrdered, command: "insertOrderedList", title: "Ordered list" },
    { icon: Link, command: "createLink", title: "Link" },
    { icon: Image, command: "insertImage", title: "Image" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Panel */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <div>
                <div className="text-sm font-medium text-blue-600">
                  STEP 4 OF 5
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Tell your story
                </h1>
              </div>
            </div>

            <p className="text-lg text-gray-600">
              Share details that will connect with your supporters.
            </p>

            {/* Storytelling Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">
                Storytelling Tips
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Use a clear, engaging image to grab attention.</li>
                <li>
                  • Give your fundraiser a memorable and descriptive name.
                </li>
                <li>• Explain who you are and why you&apos;re fundraising.</li>
                <li>• Share why this matters to you.</li>
                <li>• Explain how the funds will make an impact.</li>
              </ul>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your Campaign Details
              </h2>

              {/* Cover Photo */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Photo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {coverPhoto ? (
                    <div className="relative">
                      <img
                        src={getImagePreview() || ""}
                        alt="Campaign preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-gray-500 mb-2">Campaign preview</p>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Upload Image
                        </button>
                      </div>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                {errors.coverPhoto && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.coverPhoto}
                  </p>
                )}
              </div>

              {/* Campaign Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Title
                </label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => updateData({ title: e.target.value })}
                  maxLength={50}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your campaign title"
                />
                <div className="flex justify-between items-center mt-1">
                  <div className="text-sm text-gray-500">
                    {50 - data.title.length} characters left
                  </div>
                </div>
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Story Editor */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Story
                </label>

                {/* Rich Text Toolbar */}
                <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
                  {toolbarButtons.map((button, index) => (
                    <button
                      key={index}
                      onClick={() => formatText(button.command)}
                      className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900"
                      title={button.title}
                    >
                      <button.icon className="w-4 h-4" />
                    </button>
                  ))}
                  <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="p-2 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-900"
                    title="Text color"
                  >
                    <Palette className="w-4 h-4" />
                  </button>
                </div>

                {/* Text Area */}
                <textarea
                  value={data.story}
                  onChange={(e) => updateData({ story: e.target.value })}
                  className="w-full p-4 border border-gray-300 border-t-0 rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={8}
                  placeholder="Tell your story here..."
                />
                {errors.story && (
                  <p className="mt-1 text-sm text-red-600">{errors.story}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3Story;
