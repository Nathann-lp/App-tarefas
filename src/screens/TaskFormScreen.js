import React, { useState } from 'react';
import {
  View, Text, TextInput, Switch, TouchableOpacity,
  StyleSheet, ScrollView, Alert, ActivityIndicator, Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createTask, updateTask } from '../api/api';

export default function TaskFormScreen({ route, navigation }) {
  const editing = route.params?.task;

  const parseDate = (dateStr) => {
    if (!dateStr) return new Date();
    const [y, m, d] = dateStr.split('-');
    return new Date(Number(y), Number(m) - 1, Number(d));
  };

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const [titulo, setTitulo] = useState(editing?.titulo ?? '');
  const [descricao, setDescricao] = useState(editing?.descricao ?? '');
  const [prioridade, setPrioridade] = useState(String(editing?.prioridade ?? '1'));
  const [prazo, setPrazo] = useState(editing?.prazo ? parseDate(editing.prazo) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [horasEstimadas, setHorasEstimadas] = useState(String(editing?.horasEstimadas ?? ''));
  const [concluida, setConcluida] = useState(editing?.concluida ?? false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!titulo.trim()) {
      Alert.alert('Atenção', 'Título é obrigatório.');
      return;
    }

    setSaving(true);

    const payload = {
      titulo,
      descricao,
      prioridade: parseInt(prioridade),
      prazo: formatDate(prazo),
      horasEstimadas: horasEstimadas ? parseFloat(horasEstimadas) : null,
      concluida,
    };

    try {
      if (editing) {
        await updateTask(editing.id, payload);
        Alert.alert('Sucesso', 'Tarefa atualizada!');
      } else {
        await createTask(payload);
        Alert.alert('Sucesso', 'Tarefa criada!');
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.label}>Título *</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Ex: Criar protótipo"
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descreva a tarefa..."
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Prioridade</Text>
      <View style={styles.prioRow}>
        {['1', '2', '3'].map(p => (
          <TouchableOpacity
            key={p}
            style={[styles.prioBtn, prioridade === p && styles.prioBtnActive]}
            onPress={() => setPrioridade(p)}
          >
            <Text style={[styles.prioText, prioridade === p && styles.prioTextActive]}>
              {p === '1' ? 'Baixa' : p === '2' ? 'Média' : 'Alta'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Prazo</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateButtonText}>📅 {formatDate(prazo)}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={prazo}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === 'ios');
            if (selectedDate) setPrazo(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Horas Estimadas</Text>
      <TextInput
        style={styles.input}
        value={horasEstimadas}
        onChangeText={setHorasEstimadas}
        placeholder="Ex: 4.5"
        keyboardType="decimal-pad"
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Concluída</Text>
        <Switch
          value={concluida}
          onValueChange={setConcluida}
          trackColor={{ true: '#6200ee' }}
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleSave} disabled={saving}>
        {saving
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.btnText}>{editing ? 'Atualizar' : 'Criar Tarefa'}</Text>
        }
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff', flexGrow: 1 },
  label: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 6, marginTop: 16 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    padding: 12, fontSize: 15, backgroundColor: '#fafafa',
  },
  multiline: { height: 100, textAlignVertical: 'top' },
  prioRow: { flexDirection: 'row', gap: 10 },
  prioBtn: {
    flex: 1, padding: 10, borderRadius: 8,
    borderWidth: 1, borderColor: '#ddd', alignItems: 'center',
  },
  prioBtnActive: { backgroundColor: '#6200ee', borderColor: '#6200ee' },
  prioText: { color: '#555', fontWeight: '600' },
  prioTextActive: { color: '#fff' },
  dateButton: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    padding: 14, backgroundColor: '#fafafa',
  },
  dateButtonText: { fontSize: 15, color: '#333' },
  switchRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginTop: 16,
  },
  btn: {
    backgroundColor: '#6200ee', padding: 16,
    borderRadius: 12, alignItems: 'center', marginTop: 32, marginBottom: 20,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});