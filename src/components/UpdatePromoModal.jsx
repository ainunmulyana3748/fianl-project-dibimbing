import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useUploadImage from "@/hooks/useUploadImage";
import useUpdatePromo from "@/hooks/Promos/useUpdatePromo";

const UpdatePromoModal = ({ open, onClose, promo, onUpdated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscountPrice, setPromoDiscountPrice] = useState(0);
  const [minimumClaimPrice, setMinimumClaimPrice] = useState(0);
  const [termsCondition, setTermsCondition] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { uploadImage } = useUploadImage();
  const { updatePromo } = useUpdatePromo();

  useEffect(() => {
    if (promo) {
      setTitle(promo.title || "");
      setDescription(promo.description || "");
      setPromoCode(promo.promo_code || "");
      setPromoDiscountPrice(promo.promo_discount_price || 0);
      setMinimumClaimPrice(promo.minimum_claim_price || 0);
      setTermsCondition(promo.terms_condition || "");
      setImageUrl(promo.imageUrl || "");
      setPreview(promo.imageUrl || "");
    }
  }, [promo]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const { urlImage } = await uploadImage(file);
      setImageUrl(urlImage);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    await updatePromo(promo.id, {
      title,
      description,
      imageUrl,
      terms_condition: termsCondition,
      promo_code: promoCode,
      promo_discount_price: Number(promoDiscountPrice),
      minimum_claim_price: Number(minimumClaimPrice),
    });
    setIsLoading(false);
    onClose();
    if (onUpdated) onUpdated();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Promo</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label>Promo Code</Label>
            <Input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label>Discount Price</Label>
              <Input
                type="number"
                value={promoDiscountPrice}
                onChange={(e) => setPromoDiscountPrice(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <Label>Minimum Claim Price</Label>
              <Input
                type="number"
                value={minimumClaimPrice}
                onChange={(e) => setMinimumClaimPrice(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Terms & Conditions (HTML allowed)</Label>
            <Textarea
              rows={4}
              value={termsCondition}
              onChange={(e) => setTermsCondition(e.target.value)}
            />
          </div>

          <div>
            <Label>Upload Image</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && (
              <img
                src={preview}
                alt="Promo Preview"
                className="w-full h-48 object-cover border rounded mt-2"
              />
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePromoModal;
