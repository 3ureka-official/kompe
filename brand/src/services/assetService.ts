import supabase from "@/lib/supabase";
import {
  AssetItem,
  Contest,
  FormAssetItem,
  InspirationItem,
} from "@/types/Contest";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "@/lib/storage";

/**
 * コンテストアセットを作成
 * @param brandId ブランドID
 * @param contestId コンテストID
 * @param assetFormData アセット
 * @returns 作成されたアセットのID
 */

export const createAsset = async (
  brandId: string,
  contestId: string,
  assetFormData: FormAssetItem[],
): Promise<void> => {
  for (const asset of assetFormData) {
    const assetId = uuidv4();

    const assetData: Omit<AssetItem, "created_at"> = {
      id: assetId,
      contest_id: contestId,
      brand_id: brandId,
      file_url: null,
      url: null,
      description: asset.description,
    };

    if (asset.file) {
      const fileUrl = await uploadFile(
        "contests",
        `${contestId}/assets/${assetId}`,
        asset.file,
      );
      assetData.file_url = fileUrl;
    }
    if (asset.url) {
      assetData.url = asset.url;
    }

    try {
      const { error } = await supabase
        .from("contests_assets")
        .insert(assetData);
      if (error) {
        console.error("コンテストアセット作成エラー:", error.message);
      }
    } catch (error) {
      console.error("コンテストアセット作成エラー:", error);
    }
  }
};
