import { useState } from "react";

function Renderer({ schema, callback }) {
  if (!schema || schema.type !== "card") return null;

  const title = schema.title ?? "";
  const fields = Array.isArray(schema.fields) ? schema.fields : [];

  const [visibleCount, setVisibleCount] = useState(1);

  const visibleFields = fields.slice(0, visibleCount);

  function handleNext() {
    if (visibleCount < fields.length) {
        setVisibleCount(visibleCount + 1);
    }
    else if (callback) {
        callback();
    }
  }

  return (
    <div className="card">
      {title && <h2 className="card-title">{title}</h2>}

      <div className="card-content space-y-2">
        {visibleFields.map((field, index) => {
          if (!field) return null;

          const label = field.label ?? "";
          const value = field.value ?? "";

          return (
            <p
              key={field.id ?? `${label}-${index}`}
              className="fade-in"
            >
              {label && <strong>{label}:</strong>}{" "}
              {String(value)}
            </p>
          );
        })}
      </div>

      <button
        className="next-button mt-4"
        onClick={handleNext}
      >
          Weiter
      </button>
    </div>
  );
}

export default Renderer;