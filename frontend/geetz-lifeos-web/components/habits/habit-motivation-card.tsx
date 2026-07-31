"use client";

export function HabitMotivationCard() {
  return (
    <div className="h-40 rounded-xl overflow-hidden relative group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        alt="A breathtaking landscape of a lush emerald green mountain range shrouded in mist at sunrise. The lighting is ethereal and soft, emphasizing deep textures of moss and jagged obsidian rocks. The overall mood is one of stoic determination, quiet focus, and the expansive feeling of elite personal achievement."
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ6eYRpxbRS2KQr_YF9IhAumma6a-vbfAWM5R0wQT7PMCXQrWPj3bVyOjEXeFHWpccGqfsYn2HIJ5Zgkl_7n8sb0zvpKTLA7nK2WjgGvz7dx9kJUg5Pp3aGkqP99Y0Fq6MqyvoGVJ7MwrdXdocDBulkR2-8m8Niuf-q-MrV8tM61M_CsYcEqhzxORxCJ6XSmulGF9Bju2oLs7jJVnfPXwJu6MFDSaqxuYbzl5zFqv8ktnEXx7cc05L"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-lg">
        <p className="font-headline-md text-[14px] italic text-on-surface">
          &ldquo;Consistency is the signature of mastery.&rdquo;
        </p>
      </div>
    </div>
  );
}
