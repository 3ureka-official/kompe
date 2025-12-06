import { useBasicInfo } from "@/features/contest/form/hooks/useBasicInfo";
import { DateRangeField } from "@/components/ui-elements/form/DateRangeField";
import { TextField } from "@/components/ui-elements/form/TextField";
import { ActionButtons } from "./ActionButtons";
import { MultiImageUploadField } from "../ui-elements/MultiImageUploadField";

export function BasicInfo() {
  const {
    control,
    watchThumbnail,
    isLoading,
    handleThumbnailSubmit,
    handleDeleteThumbnail,
    handleDraft,
    handleNext,
  } = useBasicInfo();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 bg-white rounded-lg p-8 shadow-sm">
        <TextField
          control={control}
          name="title"
          label="コンテストタイトル"
          required
          placeholder="例：コーディネートコンテスト"
        />

        <MultiImageUploadField
          control={control}
          name="thumbnail_urls"
          label="サムネイル画像"
          handleSubmit={handleThumbnailSubmit}
          handleDelete={handleDeleteThumbnail}
          disabled={isLoading}
          images={watchThumbnail}
          maxImages={5}
        />
      </div>

      {/* 応募期間 */}
      <div className="flex flex-col gap-8 bg-white rounded-lg p-8 shadow-sm">
        <div className="space-y-2">
          <DateRangeField
            control={control}
            name1="entry_start_date"
            name2="entry_end_date"
            required
            label="応募期間"
          />
        </div>

        {/* 動画制作期間 */}
        <div className="space-y-2">
          <DateRangeField
            control={control}
            name1="video_production_start_date"
            name2="video_production_end_date"
            required
            label="動画制作期間"
          />
        </div>

        {/* 開催期間 */}
        <div className="space-y-2">
          <DateRangeField
            control={control}
            name1="contest_start_date"
            name2="contest_end_date"
            required
            label="開催期間"
          />
        </div>
      </div>

      <ActionButtons
        isLoading={isLoading}
        handleDraft={handleDraft}
        handleNext={handleNext}
        needBackButton={false}
        needSubmitButton={false}
      />
    </div>
  );
}
