"use client";

export function Background() {
  return (
    <>
      <div
        className="absolute z-10 top-[625px] right-[-308px] w-[1350px] h-[600px] bg-black/90 rounded-[100%]"
        style={{ zIndex: 0 }}
      />
      <div
        className="absolute z-10 top-[925px] left-[-308px] w-[1350px] h-[600px] bg-black/90 rounded-[100%]"
        style={{ zIndex: 0 }}
      />
    </>
  );
}
