import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import useAddActivity from "@/hooks/Activities/useAddActivity";
import useUploadImage from "@/hooks/useUploadImage";
import useGetDataCategories from "@/hooks/Categories/useGetDataCategories";

const AddActivityModal = ({ open, onClose, onUpdated }) => {
  const { createActivity, loading } = useAddActivity();
  const { uploadImage } = useUploadImage();
  const { dataCategories } = useGetDataCategories();

  const [form, setForm] = useState({
    categoryId: "",
    title: "",
    description: "",
    price: "",
    price_discount: "",
    rating: "",
    total_reviews: "",
    facilities: "",
    address: "",
    province: "",
    city: "",
    location_maps: "",
  });

  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    try {
      const urls = await Promise.all(files.map((file) => uploadImage(file)));
      setImageUrls((prev) => [...prev, ...urls]);
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        imageUrls,
        price: Number(form.price),
        price_discount: Number(form.price_discount),
        rating: Number(form.rating),
        total_reviews: Number(form.total_reviews),
      };

      await createActivity(payload);
      onClose();
      onUpdated();
    } catch (error) {
      console.error("Failed to create activity", error);
    }
  };

  const removeImage = (url) => {
    setImageUrls((prev) => prev.filter((img) => img !== url));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Activity</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          {/* Category Dropdown */}
          <div className="col-span-2">
            <Label>Category</Label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
            >
              <option value="">-- Select Category --</option>
              {dataCategories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Other Inputs */}
          {Object.keys(form).map((key) => {
            if (key === "categoryId") return null;
            return (
              <div key={key} className="col-span-2">
                <Label className="capitalize">{key.replace(/_/g, " ")}</Label>
                {["description", "facilities", "location_maps"].includes(
                  key
                ) ? (
                  <Textarea
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                  />
                ) : (
                  <Input name={key} value={form[key]} onChange={handleChange} />
                )}
              </div>
            );
          })}

          {/* Upload Gambar */}
          <div className="col-span-2">
            <Label>Upload Images</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            {uploading && (
              <p className="text-sm text-gray-500 mt-1">Uploading...</p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {imageUrls.map((url, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={url}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <button
                    onClick={() => removeImage(url)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    title="Remove"
                    type="button"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading || uploading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddActivityModal;
