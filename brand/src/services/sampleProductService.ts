import { supabase } from "@/lib/supabase";
import { SampleProduct } from "@/types/SampleProduct";
import { v4 as uuidv4 } from "uuid";

/**
 * 試供品を作成
 * @param contestId コンテストID
 * @param sampleData 試供品データ
 */
export async function createSampleProduct(
  contestId: string,
  sampleData: Omit<SampleProduct, "id" | "contest_id" | "created_at">,
): Promise<SampleProduct> {
  try {
    const { data, error } = await supabase
      .from("sample_products")
      .insert({
        id: uuidv4(),
        contest_id: contestId,
        ...sampleData,
      })
      .select("*")
      .single();

    if (error) throw error;

    return data as SampleProduct;
  } catch (error) {
    console.error("試供品作成エラー:", error);
    throw error;
  }
}

/**
 * 複数の試供品を作成
 * @param contestId コンテストID
 * @param samplesData 試供品データ配列
 */
export async function createSampleProducts(
  contestId: string,
  samplesData: Omit<SampleProduct, "id" | "contest_id" | "created_at">[],
): Promise<SampleProduct[]> {
  try {
    if (samplesData.length === 0) {
      return [];
    }

    const insertData = samplesData.map((sample) => ({
      id: uuidv4(),
      contest_id: contestId,
      ...sample,
    }));

    const { data, error } = await supabase
      .from("sample_products")
      .insert(insertData)
      .select("*");

    if (error) throw error;

    return data as SampleProduct[];
  } catch (error) {
    console.error("試供品一括作成エラー:", error);
    throw error;
  }
}

/**
 * コンテストIDに紐づく試供品を取得
 * @param contestId コンテストID
 */
export async function getSampleProductsByContestId(
  contestId: string,
): Promise<SampleProduct[]> {
  try {
    const { data, error } = await supabase
      .from("sample_products")
      .select("*")
      .eq("contest_id", contestId)
      .order("created_at", { ascending: true });

    if (error) throw error;

    return data as SampleProduct[];
  } catch (error) {
    console.error("試供品取得エラー:", error);
    throw error;
  }
}

/**
 * 試供品を更新
 * @param sampleId 試供品ID
 * @param sampleData 更新データ
 */
export async function updateSampleProduct(
  sampleId: string,
  sampleData: Partial<Omit<SampleProduct, "id" | "contest_id" | "created_at">>,
): Promise<SampleProduct> {
  try {
    const { data, error } = await supabase
      .from("sample_products")
      .update(sampleData)
      .eq("id", sampleId)
      .select("*")
      .single();

    if (error) throw error;

    return data as SampleProduct;
  } catch (error) {
    console.error("試供品更新エラー:", error);
    throw error;
  }
}

/**
 * 試供品を削除
 * @param sampleId 試供品ID
 */
export async function deleteSampleProduct(sampleId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from("sample_products")
      .delete()
      .eq("id", sampleId);

    if (error) throw error;
  } catch (error) {
    console.error("試供品削除エラー:", error);
    throw error;
  }
}

/**
 * コンテストIDに紐づく試供品をすべて削除
 * @param contestId コンテストID
 */
export async function deleteSampleProductsByContestId(
  contestId: string,
): Promise<void> {
  try {
    const { error } = await supabase
      .from("sample_products")
      .delete()
      .eq("contest_id", contestId);

    if (error) throw error;
  } catch (error) {
    console.error("試供品一括削除エラー:", error);
    throw error;
  }
}

/**
 * 試供品を一括更新（削除して再作成）
 * @param contestId コンテストID
 * @param samplesData 試供品データ配列
 */
export async function updateSampleProducts(
  contestId: string,
  samplesData: Omit<SampleProduct, "id" | "contest_id" | "created_at">[],
): Promise<SampleProduct[]> {
  try {
    // 既存の試供品をすべて削除
    await deleteSampleProductsByContestId(contestId);

    // 新しい試供品を作成
    if (samplesData.length > 0) {
      return await createSampleProducts(contestId, samplesData);
    }

    return [];
  } catch (error) {
    console.error("試供品一括更新エラー:", error);
    throw error;
  }
}
