"use server";

export const follow = async (id: string) => {
  try {
    console.log("This is server action: ", id);
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};
