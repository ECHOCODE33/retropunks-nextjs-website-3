import os

# --- CONFIGURATION ---
# Add folders or files you want to skip here
IGNORE_LIST = {
    '_Extras',
    '.next',
    'node_modules',
    '.env',
    '.gitignore',
    'eslint.config.mjs'
    'next-env.d.ts',
    'next.config.ts',
    'package-lock.json',
    'package.json',
    'postcss.config.mjs',
    'README.md',
    'tsconfig.json',
    'complete.py',
    'complete.md',
    'public',
    '.git'
}

# Mapping extensions to markdown code block languages
EXT_MAP = {
    '.tsx': 'tsx',
    '.ts': 'typescript',
    '.js': 'javascript',
    '.jsx': 'jsx',
    '.py': 'python',
    '.css': 'css',
    '.html': 'html',
    '.mjs': 'mjs',
    '.json': 'json',
    '.md': 'markdown'
}

OUTPUT_FILE = 'complete.md'


def should_ignore(name):
    return name in IGNORE_LIST


def generate_markdown():
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f_out:
        for root, dirs, files in os.walk('.'):
            # Modify dirs in-place to skip ignored directories
            dirs[:] = [d for d in dirs if not should_ignore(d)]

            for file in files:
                if should_ignore(file):
                    continue

                file_path = os.path.join(root, file)
                # Get relative path for the header
                rel_path = os.path.relpath(file_path, '.')

                _, ext = os.path.splitext(file)
                lang = EXT_MAP.get(ext, '')

                try:
                    with open(file_path, 'r', encoding='utf-8') as f_in:
                        content = f_in.read()

                    f_out.write(f"{rel_path}\n")
                    f_out.write(f"```{lang}\n")
                    f_out.write(content)
                    f_out.write("\n```\n\n")

                except (UnicodeDecodeError, PermissionError):
                    # Skips binary files (images, etc.) or restricted files
                    continue

    print(f"✅ Project organized into {OUTPUT_FILE}")


if __name__ == "__main__":
    generate_markdown()
