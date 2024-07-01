export default function MyDayForm({ onSubmit }: any ) {
  const currentDate = new Date();

  const handlSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(form.entries());

    // console.log(data);
    onSubmit(data);
  }

  return (
    <section className="min-w-[310px]">
      <header className="mb-4 font-bold">{currentDate.toDateString()}</header>
      <article>
        <form onSubmit={handlSubmit}>
          <div className="mb-3">
            <select
              name="productive"
              id="productive"
              className="w-full border p-1 rounded"
            >
              <option value="true">Productive</option>
              <option value="false">Not productive</option>
            </select>
          </div>

          <div className="mb-4">
            <select
              name="broke_rules"
              id="broke_rules"
              className="w-full border p-1 rounded"
            >
              <option value="false">Followed rules</option>
              <option value="true">Broked rules</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button className="px-6 py-2 bg-green-400 text-white rounded">Save</button>
          </div>
        </form>
      </article>
    </section>
  );
}
