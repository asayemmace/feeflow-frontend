import { useState } from 'react';
import { useStore } from '../store/useStore';
import { X } from 'lucide-react';

export default function AddStudentModal({ onClose }) {
  const addStudent = useStore(state => state.addStudent);
  const [formData, setFormData] = useState({
    name: '', cls: 'Form 1A', parent: '', phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Auto-calculate fee based on the Form number
    const formNum = parseInt(formData.cls.match(/\d/)[0]);
    const feeMap = { 1: 18000, 2: 20000, 3: 22000, 4: 24000 };
    const fee = feeMap[formNum] || 18000;

    // Add to Zustand store
    addStudent({
      ...formData,
      adm: `ADM-${Math.floor(1000 + Math.random() * 9000)}`, // Generate random ADM
      form: formNum,
      fee: fee,
      paid: 0,
      status: 'Unpaid'
    });
    
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal anim-up" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-title">Add New Student</div>
          <button className="btn-icon" onClick={onClose}><X /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-4">
            <div>
              <label>Student Full Name</label>
              <input required type="text" className="input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Doe" />
            </div>
            
            <div className="form-grid-2">
              <div>
                <label>Class / Form</label>
                <select className="input" value={formData.cls} onChange={e => setFormData({...formData, cls: e.target.value})}>
                  <option>Form 1A</option><option>Form 1B</option><option>Form 1C</option>
                  <option>Form 2A</option><option>Form 2B</option><option>Form 2C</option>
                  <option>Form 3A</option><option>Form 3B</option><option>Form 3C</option>
                  <option>Form 4A</option><option>Form 4B</option><option>Form 4C</option>
                </select>
              </div>
              <div>
                <label>Parent/Guardian Phone</label>
                <input required type="text" className="input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="07XX XXX XXX" />
              </div>
            </div>

            <div>
              <label>Parent/Guardian Name</label>
              <input required type="text" className="input" value={formData.parent} onChange={e => setFormData({...formData, parent: e.target.value})} placeholder="e.g. Jane Doe" />
            </div>
          </div>
          
          <div className="p-4 border-t border-[var(--border)] flex justify-end gap-3 bg-[var(--surface2)]">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Student</button>
          </div>
        </form>
      </div>
    </div>
  );
}