'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [apiStatus, setApiStatus] = useState('loading');
  const [salas, setSalas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [selectedSalaId, setSelectedSalaId] = useState('');
  const [estudiante, setEstudiante] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [toast, setToast] = useState(null);
  const [toastTimeout, setToastTimeout] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const fetchData = async () => {
    try {
      const resSalas = await fetch(`${API_URL}/api/salas`);
      if (!resSalas.ok) throw new Error();
      const dataSalas = await resSalas.json();
      setSalas(dataSalas);

      const resReservas = await fetch(`${API_URL}/api/reservas`);
      if (resReservas.ok) {
        const dataReservas = await resReservas.json();
        setReservas(dataReservas);
      }
      setApiStatus('online');
    } catch (err) {
      setApiStatus('offline');
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      if (toastTimeout) clearTimeout(toastTimeout);
    };
  }, [API_URL]);

  const showToast = (message, type) => {
    if (toastTimeout) clearTimeout(toastTimeout);
    setToast({ message, type });
    const timeout = setTimeout(() => setToast(null), 4000);
    setToastTimeout(timeout);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSalaId || !estudiante || !fecha || !hora) {
      showToast('Por favor completa todos los campos obligatorios', 'error');
      return;
    }
    setLoadingSubmit(true);
    try {
      const res = await fetch(`${API_URL}/api/reservas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          salaId: Number(selectedSalaId),
          estudiante,
          fecha,
          hora
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error al registrar la reserva');
      }
      showToast('¡Reserva registrada correctamente!', 'success');
      setEstudiante('');
      setFecha('');
      setHora('');
      setSelectedSalaId('');
      fetchData();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleCancel = async (id) => {
    if (!confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/reservas/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al cancelar la reserva');
      }
      showToast('Reserva cancelada correctamente', 'success');
      fetchData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const getSalaName = (salaId) => {
    const sala = salas.find(s => s.id === salaId);
    return sala ? `${sala.nombre} (${sala.edificio})` : `Sala #${salaId}`;
  };

  return (
    <div className="layout-container">
      {toast && (
        <div className="notification-container">
          <div className={`toast toast-${toast.type}`}>
            <span className="toast-icon">{toast.type === 'success' ? '✓' : '⚠️'}</span>
            <span className="toast-message">{toast.message}</span>
          </div>
        </div>
      )}

      <header className="app-header">
        <div className="header-title-wrapper">
          <span className="header-emoji">🏫</span>
          <h1 className="header-title">Sala de Estudios</h1>
        </div>
        <p className="header-subtitle">
          Sistema de gestión de espacios y reservas académicas.
        </p>
      </header>

      <div className="glow-accent-1"></div>
      <div className="glow-accent-2"></div>

      <main className="main-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section className="glass-panel">
            <div className="panel-header">
              <h2 className="panel-title">Nueva Reserva</h2>
              <p className="panel-subtitle">Completa los datos para agendar una sala.</p>
            </div>

            <form onSubmit={handleSubmit} className="form-container">
              <div className="form-group">
                <label className="form-label">Sala de Estudio</label>
                <select
                  value={selectedSalaId}
                  onChange={(e) => setSelectedSalaId(e.target.value)}
                  className="form-input"
                  required
                >
                  <option value="">Selecciona una sala...</option>
                  {salas.map((sala) => (
                    <option key={sala.id} value={sala.id} disabled={sala.estado !== 'disponible'}>
                      {sala.nombre} - {sala.edificio} ({sala.estado})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Nombre del Estudiante</label>
                <input
                  type="text"
                  value={estudiante}
                  onChange={(e) => setEstudiante(e.target.value)}
                  placeholder="Ej. Juan Pérez"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Fecha</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Hora</label>
                <input
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <button type="submit" disabled={loadingSubmit || apiStatus !== 'online'} className="btn-primary">
                {loadingSubmit ? <div className="spinner"></div> : 'Confirmar Reserva'}
              </button>
            </form>
          </section>

          <section className="glass-panel">
            <div className="list-header">
              <h2 className="panel-title">Reservas Activas</h2>
              <span className="badge-count">{reservas.length}</span>
            </div>

            {reservas.length === 0 ? (
              <div className="state-container" style={{ padding: '2rem 1rem' }}>
                <span className="state-emoji">📅</span>
                <p className="state-title">No hay reservas</p>
                <p className="state-message">Las salas están disponibles para ser reservadas.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                {reservas.map((reserva) => (
                  <div key={reserva.id} className="course-card" style={{ animation: 'scaleIn 0.3s ease-out' }}>
                    <div className="course-info">
                      <h3 className="course-title">{reserva.estudiante}</h3>
                      <p className="course-instructor">
                        <span className="instructor-icon">🚪</span> {getSalaName(reserva.salaId)}
                      </p>
                      <p className="course-instructor">
                        <span className="instructor-icon">📅</span> {reserva.fecha} a las {reserva.hora}
                      </p>
                    </div>
                    <div className="course-footer" style={{ borderTop: 'none', paddingTop: '0.5rem' }}>
                      <span className="course-id">Reserva #{reserva.id}</span>
                      <button
                        onClick={() => handleCancel(reserva.id)}
                        className="btn-secondary"
                        style={{ backgroundColor: 'var(--error-color)', padding: '0.35rem 0.75rem', fontSize: '0.75rem', boxShadow: 'none' }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <section className="glass-panel">
          <div className="list-header">
            <h2 className="panel-title">Catálogo de Salas</h2>
            <span className="badge-count" style={{ backgroundColor: 'var(--success-color)', boxShadow: 'none' }}>
              {salas.length}
            </span>
          </div>

          {apiStatus === 'loading' ? (
            <div className="state-container">
              <div className="spinner spinner-large"></div>
              <p className="state-title">Cargando salas...</p>
            </div>
          ) : apiStatus === 'offline' ? (
            <div className="state-container">
              <span className="state-emoji">🔴</span>
              <p className="state-title">Servidor desconectado</p>
              <p className="state-message">No se pudo establecer conexión con la API en {API_URL}.</p>
              <button onClick={fetchData} className="btn-secondary">Reintentar</button>
            </div>
          ) : salas.length === 0 ? (
            <div className="state-container">
              <span className="state-emoji">🚪</span>
              <p className="state-title">No hay salas registradas</p>
              <p className="state-message">Agrega salas mediante la API o base de datos.</p>
            </div>
          ) : (
            <div className="courses-grid">
              {salas.map((sala) => (
                <div key={sala.id} className="course-card">
                  <div className="course-info">
                    <h3 className="course-title">{sala.nombre}</h3>
                    <p className="course-instructor">
                      <span className="instructor-icon">📍</span> {sala.edificio} - {sala.piso}
                    </p>
                    <p className="course-instructor">
                      <span className="instructor-icon">👥</span> Capacidad: {sala.capacidad} personas
                    </p>
                    {sala.equipamiento && (
                      <p className="course-instructor">
                        <span className="instructor-icon">🛠️</span> {sala.equipamiento}
                      </p>
                    )}
                  </div>
                  <div className="course-footer">
                    <span className="badge-credits" style={{
                      color: sala.estado === 'disponible' ? 'var(--success-color)' : 'var(--error-color)',
                      borderColor: sala.estado === 'disponible' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'
                    }}>
                      {sala.estado}
                    </span>
                    {sala.estado === 'disponible' && (
                      <button
                        onClick={() => setSelectedSalaId(sala.id)}
                        className="btn-secondary"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                      >
                        Seleccionar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
