"""Package _skills/complex-securities-tutor/ for the course page.

Writes, under learn/complex-securities/:
  complex-securities-tutor.zip  - the skill folder, ready to upload to Claude
  course-prompt.txt             - the instructions without front matter, for pasting into any chat

The zip uses fixed timestamps so it only changes when SKILL.md changes.
Run: python3 scripts/package-skill.py
"""
import pathlib, zipfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
SKILL = ROOT / "_skills" / "complex-securities-tutor"
OUT = ROOT / "learn" / "complex-securities"
OUT.mkdir(parents=True, exist_ok=True)

files = sorted(p for p in SKILL.rglob("*") if p.is_file())
with zipfile.ZipFile(OUT / "complex-securities-tutor.zip", "w", zipfile.ZIP_DEFLATED) as z:
    for p in files:
        info = zipfile.ZipInfo(str(pathlib.Path("complex-securities-tutor") / p.relative_to(SKILL)), date_time=(2026, 1, 1, 0, 0, 0))
        info.compress_type = zipfile.ZIP_DEFLATED
        info.external_attr = 0o644 << 16
        z.writestr(info, p.read_bytes())

text = (SKILL / "SKILL.md").read_text(encoding="utf-8")
if text.startswith("---"):
    text = text.split("---", 2)[2]
(OUT / "course-prompt.txt").write_text(text.lstrip("\n"), encoding="utf-8")
print(f"Packaged {len(files)} file(s) into {OUT.relative_to(ROOT)}")
