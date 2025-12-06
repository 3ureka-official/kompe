import { useState } from "react";
import { Application } from "@/types/Application";
import { ContestPrize } from "@/types/Contest";
import { formatNumber } from "@/utils/format";

export function useContestCreatorSection() {
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (application: Application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  const renderRankColor = (
    rank: number,
    contestPrizes?: ContestPrize[],
  ): string => {
    const prize = contestPrizes?.find((p) => p.rank === rank + 1);
    if (rank === 0 && prize && formatNumber(prize.amount) != "0")
      return "bg-yellow-500 text-white";
    if (rank === 1 && prize && formatNumber(prize.amount) != "0")
      return "bg-gray-500 text-white";
    if (rank === 2 && prize && formatNumber(prize.amount) != "0")
      return "bg-orange-700 text-white";
    if (prize && formatNumber(prize.amount) != "0")
      return "bg-blue-500 text-white";
    return "";
  };

  return {
    selectedApplication,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    renderRankColor,
  };
}
