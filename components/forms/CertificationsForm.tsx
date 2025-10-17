import React, { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { generateId } from '@/lib/utils';
import { Certification } from '@/types/resume';

export function CertificationsForm() {
  const { resumeData, addCertification, removeCertification } = useResumeStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Certification, 'id'>>({
    name: '',
    issuer: '',
    date: '',
    credentialId: '',
    link: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      issuer: '',
      date: '',
      credentialId: '',
      link: '',
    });
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCertification({ ...formData, id: generateId() });
    resetForm();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Certifications</CardTitle>
          <Button
            onClick={() => setShowForm(!showForm)}
            size="sm"
            variant={showForm ? 'outline' : 'default'}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Certification
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {resumeData.certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-4 border border-gray-200 rounded-lg space-y-2"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold">{cert.name}</h4>
                <p className="text-sm text-gray-600">{cert.issuer}</p>
                <p className="text-sm text-gray-500">{cert.date}</p>
                {cert.credentialId && (
                  <p className="text-xs text-gray-500 mt-1">ID: {cert.credentialId}</p>
                )}
                {cert.link && (
                  <p className="text-sm text-blue-600 mt-1">{cert.link}</p>
                )}
              </div>
              <Button
                onClick={() => removeCertification(cert.id)}
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
              <Label htmlFor="certName">Certification Name *</Label>
              <Input
                id="certName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="AWS Certified Solutions Architect"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issuer">Issuing Organization *</Label>
                <Input
                  id="issuer"
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  placeholder="Amazon Web Services"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="certDate">Date Obtained *</Label>
                <Input
                  id="certDate"
                  type="month"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="credentialId">Credential ID (Optional)</Label>
                <Input
                  id="credentialId"
                  value={formData.credentialId || ''}
                  onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                  placeholder="ABC123XYZ"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="certLink">Verification Link (Optional)</Label>
                <Input
                  id="certLink"
                  value={formData.link || ''}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="button" onClick={resetForm} variant="outline">
                Cancel
              </Button>
              <Button type="submit">
                Add Certification
              </Button>
            </div>
          </form>
        )}

        {resumeData.certifications.length === 0 && !showForm && (
          <div className="text-center py-8 text-gray-500">
            <p>No certifications added yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
