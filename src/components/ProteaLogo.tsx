export function ProteaLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <g strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor">
        {/* Top Center Petal */}
        <polygon points="50,8 40,38 60,38" fill="currentColor" fillOpacity="0.1" />
        
        {/* Side Petals (Left) */}
        <polygon points="30,16 35,42 45,36" fill="currentColor" fillOpacity="0.1" />
        <polygon points="14,35 30,50 40,42" fill="currentColor" fillOpacity="0.1" />
        <polygon points="12,55 25,60 38,50" fill="currentColor" fillOpacity="0.1" />
        <polygon points="20,75 35,65 45,55" fill="currentColor" fillOpacity="0.1" />

        {/* Side Petals (Right) */}
        <polygon points="70,16 65,42 55,36" fill="currentColor" fillOpacity="0.1" />
        <polygon points="86,35 70,50 60,42" fill="currentColor" fillOpacity="0.1" />
        <polygon points="88,55 75,60 62,50" fill="currentColor" fillOpacity="0.1" />
        <polygon points="80,75 65,65 55,55" fill="currentColor" fillOpacity="0.1" />
        
        {/* Base / Bowl Component */}
        <path d="M25 50 C 25 85, 75 85, 75 50 C 75 40, 65 35, 50 35 C 35 35, 25 40, 25 50 Z" />
        
        {/* Internal Intersection Lines for the Bowl */}
        <line x1="50" y1="35" x2="50" y2="78" />
        <line x1="37" y1="45" x2="63" y2="68" />
        <line x1="63" y1="45" x2="37" y2="68" />
      </g>
    </svg>
  );
}
