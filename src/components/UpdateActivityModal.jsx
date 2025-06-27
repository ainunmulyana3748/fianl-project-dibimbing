// components/UpdateActivityModal.js
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import useUpdateActivity from "@/hooks/Activities/useUpdateActivity";

const UpdateActivityModal = ({
  open,
  onClose,
  activity,
  onUpdated,
  categories,
}) => {
  const { updateActivity } = useUpdateActivity(onUpdated);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    price_discount: "",
    rating: "",
    total_reviews: "",
    city: "",
    province: "",
    imageUrls: "",
    categoryId: "",
  });

  useEffect(() => {
    if (activity) {
      setForm({
        title: activity.title || "",
        description: activity.description || "",
        price: activity.price || "",
        price_discount: activity.price_discount || "",
        rating: activity.rating || "",
        total_reviews: activity.total_reviews || "",
        city: activity.city || "",
        province: activity.province || "",
        imageUrls: activity.imageUrls?.join(",") || "",
        categoryId: activity.categoryId || "",
      });
    }
  }, [activity]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      title,
      description,
      imageUrls,
      price,
      price_discount,
      rating,
      total_reviews,
      facilities,
      address,
      province,
      city,
      categoryId,
      location_maps,
    };

    await updateActivity(activity.id, payload, () => {
      onUpdated();
      onClose();
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Activity</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input name="title" value={form.title} onChange={handleChange} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <Label>Price</Label>
              <Input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <Label>Discount Price</Label>
              <Input
                name="price_discount"
                type="number"
                value={form.price_discount}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <Label>Rating</Label>
              <Input
                name="rating"
                type="number"
                value={form.rating}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <Label>Total Reviews</Label>
              <Input
                name="total_reviews"
                type="number"
                value={form.total_reviews}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <Label>City</Label>
              <Input name="city" value={form.city} onChange={handleChange} />
            </div>
            <div className="flex-1">
              <Label>Province</Label>
              <Input
                name="province"
                value={form.province}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <Label>Image URLs (comma separated)</Label>
            <Textarea
              name="imageUrls"
              value={form.imageUrls}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Category</Label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Select Category --</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleSubmit}
              className="bg-orange-500 hover:bg-orange-400"
            >
              Update
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateActivityModal;
