import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Link as LinkIcon, Copy } from "lucide-react";

const Index = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageUrl(base64String);
        toast({
          title: "Success",
          description: "Image uploaded successfully!",
          duration: 3000,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(imageUrl);
    toast({
      title: "Copied!",
      description: "Image URL copied to clipboard",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Image to URL Converter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <label
                htmlFor="image-upload"
                className="w-full max-w-md cursor-pointer"
              >
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </div>
                <Input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>

              {imageUrl && (
                <div className="w-full space-y-4">
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt="Uploaded preview"
                      className="max-h-64 mx-auto rounded-lg shadow-md"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border">
                    <LinkIcon className="h-4 w-4 text-gray-500 shrink-0" />
                    <div className="truncate flex-1 text-sm">{imageUrl}</div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={copyToClipboard}
                      className="shrink-0"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;