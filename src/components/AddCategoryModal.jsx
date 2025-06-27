import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUploadImage from "@/hooks/useUploadImage";
import useAddCategory from "@/hooks/Categories/useAddCategory";

const AddCategoryModal = ({ open, onClose, category, onUpdated }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addCategory } = useAddCategory();
  const { uploadImage } = useUploadImage();

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setUrl(category.imageUrl);
      setPreview(category.imageUrl);
    }
  }, [category]);

  const handleFileChange = async (e) => {
    const selected = e.target.files[0];
    if (selected) {
      const { urlImage } = await uploadImage(selected);
      setUrl(urlImage);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    await addCategory(name, url);
    setIsLoading(false);
    onClose();
    if (onUpdated) onUpdated();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label>Category Name</Label>
            <Input onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Upload Image</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded border mt-2"
              />
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
