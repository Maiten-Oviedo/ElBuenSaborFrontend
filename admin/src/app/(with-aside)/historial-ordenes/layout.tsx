export default function HistorialOrdenesLayout({
  children,
  modal, // ← aquí Next inyecta el contenido de @modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-5">
      <section className="w-full h-full">{children}</section>

      {modal}
    </div>
  )
}
