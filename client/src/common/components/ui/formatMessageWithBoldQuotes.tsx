export function formatMessageWithBoldQuotes(message: string) {
  const parts = message.split(/('.*?')/g)
  return (
    <div className="max-w-[300px] text-sm">
      {parts.map((part, index) =>
        part.startsWith("'") && part.endsWith("'") ? (
          <strong key={index}>{part}</strong>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </div>
  )
}
