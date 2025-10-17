import React, { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, X } from 'lucide-react';
import { generateId } from '@/lib/utils';
import { Project } from '@/types/resume';

export function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResumeStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    name: '',
    description: '',
    technologies: [],
    link: '',
    highlights: [],
  });
  const [currentTech, setCurrentTech] = useState('');
  const [currentHighlight, setCurrentHighlight] = useState('');

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      technologies: [],
      link: '',
      highlights: [],
    });
    setCurrentTech('');
    setCurrentHighlight('');
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProject(editingId, formData);
    } else {
      addProject({ ...formData, id: generateId() });
    }
    resetForm();
  };

  const handleEdit = (project: Project) => {
    setFormData({
      name: project.name,
      description: project.description,
      technologies: project.technologies,
      link: project.link,
      highlights: project.highlights,
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const addTechnology = () => {
    if (currentTech.trim()) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, currentTech.trim()],
      });
      setCurrentTech('');
    }
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    });
  };

  const addHighlight = () => {
    if (currentHighlight.trim()) {
      setFormData({
        ...formData,
        highlights: [...formData.highlights, currentHighlight.trim()],
      });
      setCurrentHighlight('');
    }
  };

  const removeHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index),
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Projects</CardTitle>
          <Button
            onClick={() => setShowForm(!showForm)}
            size="sm"
            variant={showForm ? 'outline' : 'default'}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Project
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {resumeData.projects.map((project) => (
          <div
            key={project.id}
            className="p-4 border border-gray-200 rounded-lg space-y-2"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold">{project.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                <div className="mt-2">
                  <p className="text-xs font-medium text-gray-500">Technologies:</p>
                  <p className="text-sm text-gray-700">{project.technologies.join(', ')}</p>
                </div>
                {project.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-gray-700">• {highlight}</li>
                    ))}
                  </ul>
                )}
                {project.link && (
                  <p className="text-sm text-blue-600 mt-2">{project.link}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(project)}
                  size="sm"
                  variant="outline"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => removeProject(project.id)}
                  size="sm"
                  variant="destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-blue-200 rounded-lg bg-blue-50">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="E-commerce Platform"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the project..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Technologies Used (Add at least one)</Label>
              <div className="flex gap-2">
                <Input
                  value={currentTech}
                  onChange={(e) => setCurrentTech(e.target.value)}
                  placeholder="e.g., React, Node.js, MongoDB"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTechnology();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={addTechnology}
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1 px-3 py-1 bg-white rounded-full border text-sm"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTechnology(idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Project Link (Optional)</Label>
              <Input
                id="link"
                value={formData.link || ''}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://github.com/username/project"
              />
            </div>

            <div className="space-y-2">
              <Label>Key Highlights (Optional)</Label>
              <div className="flex gap-2">
                <Textarea
                  value={currentHighlight}
                  onChange={(e) => setCurrentHighlight(e.target.value)}
                  placeholder="Key achievement or feature of the project (e.g., Increased user engagement by 40%)"
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      addHighlight();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={addHighlight}
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2 bg-white rounded border"
                  >
                    <span className="flex-1 text-sm">{highlight}</span>
                    <Button
                      type="button"
                      onClick={() => removeHighlight(idx)}
                      variant="ghost"
                      size="sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="button" onClick={resetForm} variant="outline">
                Cancel
              </Button>
              <Button type="submit">
                {editingId ? 'Update' : 'Add'} Project
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
