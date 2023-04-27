
const nextPage = () => {
  return {
    reply_markup: {
      inline_keyboard: [
        [{ text: "next page", callback_data: "pagination" }]
      ]
    }
  }
}

export default nextPage;