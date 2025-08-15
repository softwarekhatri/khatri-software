import { motion } from "framer-motion";

const codeSnippets = [
  {
    code: `<div className="innovation">
  {solutions.map(idea =>
    <Future key={idea} />
  )}
</div>`,
    delay: 0,
    position: { top: "20%", left: "10%" }
  },
  {
    code: `const buildTomorrow = () => {
  return innovation + expertise;
};`,
    delay: 2,
    position: { top: "32%", right: "20%" }
  },
  {
    code: `// Transforming ideas into reality
function updateSoftware() {
  while(client.satisfied !== true) {
    iterate();
  }
}`,
    delay: 4,
    position: { bottom: "40%", left: "25%" }
  }
];

export default function TechnicalBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codeSnippets.map((snippet, index) => (
        <motion.div
          key={index}
          className="absolute text-white/20 font-mono text-sm"
          style={snippet.position}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 8,
            delay: snippet.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <pre className="whitespace-pre-wrap">{snippet.code}</pre>
        </motion.div>
      ))}

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-1/4 right-10 w-32 h-32 border border-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transform: "rotate(45deg)" }}
      />

      <motion.div
        className="absolute bottom-1/4 left-20 w-20 h-20 border border-white/20 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
