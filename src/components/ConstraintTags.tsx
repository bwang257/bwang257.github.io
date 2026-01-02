interface ConstraintTagsProps {
  constraints: string[];
}

export default function ConstraintTags({ constraints }: ConstraintTagsProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {constraints.map((constraint, idx) => (
        <span key={idx} className="badge">
          {constraint}
        </span>
      ))}
    </div>
  );
}
