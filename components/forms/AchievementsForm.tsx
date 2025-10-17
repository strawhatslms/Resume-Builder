import React, { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { generateId } from '@/lib/utils';
import { Achievement } from '@/types/resume';

export function AchievementsForm() {
  const { resumeData, addAchievement, removeAchievement } = useResumeStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Achievement, 'id'>>({
    title: '',
    description: '',
    date: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
    });
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAchievement({ ...formData, id: generateId() });
    resetForm();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Achievements</CardTitle>
          <Button
            onClick={() => setShowForm(!showForm)}
            size="sm"
            variant={showForm ? 'outline' : 'default'}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Achievement
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {resumeData.achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="p-4 border border-gray-200 rounded-lg space-y-2"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold">{achievement.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                <p className="text-sm text-gray-500 mt-1">{achievement.date}</p>
              </div>
              <Button
                onClick={() => removeAchievement(achievement.id)}
                size="sm"
                variant="destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-blue-200 rounded-lg bg-blue-50">
            <div className="space-y-2">
              <Label htmlFor="achievementTitle">Achievement Title *</Label>
              <Input
                id="achievementTitle"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Won Best Innovation Award"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievementDesc">Description *</Label>
              <Textarea
                id="achievementDesc"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the achievement and its significance..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievementDate">Date *</Label>
              <Input
                id="achievementDate"
                type="month"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full md:w-1/2"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="button" onClick={resetForm} variant="outline">
                Cancel
              </Button>
              <Button type="submit">
                Add Achievement
              </Button>
            </div>
          </form>
        )}

        {resumeData.achievements.length === 0 && !showForm && (
          <div className="text-center py-8 text-gray-500">
            <p>No achievements added yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
