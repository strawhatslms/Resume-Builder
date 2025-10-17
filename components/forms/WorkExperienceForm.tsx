import React, { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, X } from 'lucide-react';
import { generateId } from '@/lib/utils';
import { WorkExperience } from '@/types/resume';

export function WorkExperienceForm() {
  const { resumeData, addWorkExperience, updateWorkExperience, removeWorkExperience } = useResumeStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<WorkExperience, 'id'>>({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    responsibilities: [],
  });
  const [currentResponsibility, setCurrentResponsibility] = useState('');

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: [],
    });
    setCurrentResponsibility('');
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateWorkExperience(editingId, formData);
    } else {
      addWorkExperience({ ...formData, id: generateId() });
    }
    resetForm();
  };

  const handleEdit = (exp: WorkExperience) => {
    setFormData({
      company: exp.company,
      position: exp.position,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      responsibilities: exp.responsibilities,
    });
    setEditingId(exp.id);
    setShowForm(true);
  };

  const addResponsibility = () => {
    if (currentResponsibility.trim()) {
      setFormData({
        ...formData,
        responsibilities: [...formData.responsibilities, currentResponsibility.trim()],
      });
      setCurrentResponsibility('');
    }
  };

  const removeResponsibility = (index: number) => {
    setFormData({
      ...formData,
      responsibilities: formData.responsibilities.filter((_, i) => i !== index),
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Work Experience</CardTitle>
          <Button
            onClick={() => setShowForm(!showForm)}
            size="sm"
            variant={showForm ? 'outline' : 'default'}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Experience
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {resumeData.workExperience.map((exp) => (
          <div
            key={exp.id}
            className="p-4 border border-gray-200 rounded-lg space-y-2"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold">{exp.position}</h4>
                <p className="text-sm text-gray-600">{exp.company} | {exp.location}</p>
                <p className="text-sm text-gray-500">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
                <ul className="mt-2 space-y-1">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-sm text-gray-700">• {resp}</li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(exp)}
                  size="sm"
                  variant="outline"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => removeWorkExperience(exp.id)}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Company Name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Software Engineer"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="San Francisco, CA"
                required
              />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="month"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date {!formData.current && '*'}</Label>
                  <Input
                    id="endDate"
                    type="month"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    disabled={formData.current}
                    required={!formData.current}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200">
                <input
                  type="checkbox"
                  id="currentPosition"
                  checked={formData.current}
                  onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: e.target.checked ? '' : formData.endDate })}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="currentPosition" className="text-sm font-medium cursor-pointer">
                  I currently work here
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Responsibilities & Achievements (Add at least one)</Label>
              <div className="flex gap-2">
                <Textarea
                  value={currentResponsibility}
                  onChange={(e) => setCurrentResponsibility(e.target.value)}
                  placeholder="Describe your responsibilities and achievements (use action verbs like: led, developed, improved)"
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      addResponsibility();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={addResponsibility}
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.responsibilities.map((resp, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2 bg-white rounded border"
                  >
                    <span className="flex-1 text-sm">{resp}</span>
                    <Button
                      type="button"
                      onClick={() => removeResponsibility(idx)}
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
                {editingId ? 'Update' : 'Add'} Experience
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
