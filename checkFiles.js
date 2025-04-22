const fs = require("fs").promises;
const path = require("path");

async function checkFileStructure(dir) {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    console.log(`\nDirectory: ${dir}`);

    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        await checkFileStructure(fullPath); // Recurse into subdirectories
      } else {
        console.log(`File: ${fullPath}`);
        const content = await fs.readFile(fullPath, "utf-8");
        // Check for "use client" directive
        if (content.startsWith('"use client";')) {
          console.log(`  - Client Component Detected`);
        }
        // Check for imports (basic check)
        const imports = content.match(/import .* from .*/g) || [];
        imports.forEach((imp) => console.log(`  - Import: ${imp}`));
      }
    }
  } catch (error) {
    console.error(`Error reading ${dir}:`, error);
  }
}

// Start from the src directory (adjust path as needed)
checkFileStructure(path.join(__dirname, "src")).then(() => {
  console.log("\nFile structure check completed.");
});