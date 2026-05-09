# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a personal developer knowledge wiki (Obsidian vault) that is git-tracked. It contains technical notes, configuration references, troubleshooting guides, and study materials across various domains including AI, GIS, DevOps, databases, and web development. Content is primarily in Chinese.

## Repository Structure

- **Top-level directories** organize content by technical domain (AI, DB, DevOps, GIS, Git, Kubernetes, Language, OS, Security, Web, etc.)
- **Blog/** contains archived blog articles, unrelated to the current wiki repository structure
- **AI/** contains AI/LLM related notes, prompts, and agent skill definitions
- **ConfigDataFile/** contains reference docs for data formats (JSON, XML, YAML)
- **.obsidian/** contains Obsidian vault configuration (plugins, themes, workspace)
- **update.sh** is a convenience script for git commit and push

## Common Operations

### Syncing Changes

Use the provided script to commit and push:

```bash
./update.sh
```

Or manually:

```bash
git add <files>
git commit -m "<message>"
git push origin master
```

### Working with Obsidian

This repository is an Obsidian vault. When editing:

- **Do not modify any files in `.obsidian/`** — its contents are Obsidian software configuration settings and should only be modified through manual operations in the Obsidian application
- Use absolute path Markdown links (`[text](/path/to/note.md)`) for all internal links, never Obsidian's `[[Note Name]]` syntax
- Images and attachments should go in `assets/` folders within each directory

## File Conventions

- **Line endings**: LF (enforced via `.gitattributes`)
- **Naming**: Use descriptive Chinese names for notes reflecting the topic
- **Images**: Store in `assets/` subdirectories alongside related notes
- **Code blocks**: Use fenced code blocks with language specifiers for syntax highlighting

## Important Notes

- This is a knowledge/documentation repository, not a software project. There are no build tools, tests, or package managers.
- The `update.sh` script uses `"bak"` as a generic commit message. Prefer descriptive commit messages for significant changes.
- Do not modify `.gitignore` rules related to `.obsidian/`.
