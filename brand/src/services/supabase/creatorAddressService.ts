import { supabase } from "@/lib/supabase";
import {
  CreatorAddress,
  CreatorAddressCreate,
  CreatorAddressUpdate,
} from "@/types/CreatorAddress";

/**
 * クリエイターIDで住所を取得
 */
export const getCreatorAddressByCreatorId = async (
  creatorId: string,
): Promise<CreatorAddress | null> => {
  const { data: address, error } = await supabase
    .from("creator_addresses")
    .select("*")
    .eq("creator_id", creatorId)
    .maybeSingle();

  if (error) {
    if (error.code === "PGRST116") {
      // レコードが見つからない場合
      return null;
    }
    throw new Error(`住所の取得に失敗しました: ${error.message}`);
  }

  return address;
};

/**
 * 住所を作成
 */
export const createCreatorAddress = async (
  data: CreatorAddressCreate,
): Promise<CreatorAddress> => {
  const { data: address, error } = await supabase
    .from("creator_addresses")
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(`住所の作成に失敗しました: ${error.message}`);
  }

  return address;
};

/**
 * 住所を更新
 */
export const updateCreatorAddress = async (
  id: string,
  data: CreatorAddressUpdate,
): Promise<CreatorAddress> => {
  const { data: address, error } = await supabase
    .from("creator_addresses")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`住所の更新に失敗しました: ${error.message}`);
  }

  return address;
};

/**
 * 住所を削除
 */
export const deleteCreatorAddress = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("creator_addresses")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`住所の削除に失敗しました: ${error.message}`);
  }
};
