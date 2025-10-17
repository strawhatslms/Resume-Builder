import React, { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, X } from 'lucide-react';

export function SkillsForm() {
  const { resumeData, setSkills } = useResumeStore();
  const [categoryName, setCategoryName] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  const addCategory = () => {
    if (categoryName.trim()) {
      setSkills([...resumeData.skills, { category: categoryName.trim(), items: [] }]);
      setCategoryName('');
    }
  };

  const removeCategory = (category: string) => {
    setSkills(resumeData.skills.filter(s => s.category !== category));
  };

  const addSkillToCategory = (category: string) => {
    if (skillInput.trim()) {
      setSkills(
        resumeData.skills.map(s =>
          s.category === category
            ? { ...s, items: [...s.items, skillInput.trim()] }
            : s
        )
      );
      setSkillInput('');
      setEditingCategory(null);
    }
  };

  const removeSkillFromCategory = (category: string, skillIndex: number) => {
    setSkills(
      resumeData.skills.map(s =>
        s.category === category
          ? { ...s, items: s.items.filter((_, i) => i !== skillIndex) }
          : s
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Add Skill Category</Label>
          <div className="flex gap-2">
            <Input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g., Programming Languages, Tools, Soft Skills"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCategory();
                }
              }}
            />
            <Button onClick={addCategory} variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {resumeData.skills.map((skillCategory) => (
            <div
              key={skillCategory.category}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg">{skillCategory.category}</h4>
                <Button
                  onClick={() => removeCategory(skillCategory.category)}
                  size="sm"
                  variant="destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {editingCategory === skillCategory.category ? (
                <div className="flex gap-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Add a skill..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkillToCategory(skillCategory.category);
                      }
                      if (e.key === 'Escape') {
                        setEditingCategory(null);
                        setSkillInput('');
                      }
                    }}
                    autoFocus
                  />
                  <Button
                    onClick={() => addSkillToCategory(skillCategory.category)}
                    size="sm"
                    variant="outline"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingCategory(null);
                      setSkillInput('');
                    }}
                    size="sm"
                    variant="ghost"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setEditingCategory(skillCategory.category)}
                  size="sm"
                  variant="outline"
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              )}

              <div className="flex flex-wrap gap-2">
                {skillCategory.items.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full"
                  >
                    <span className="text-sm">{skill}</span>
                    <button
                      onClick={() => removeSkillFromCategory(skillCategory.category, idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {resumeData.skills.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No skill categories added yet.</p>
            <p className="text-sm">Start by adding a category above (e.g., Programming Languages, Tools, etc.)</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
