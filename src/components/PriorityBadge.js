import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const labels = { 1: 'Baixa', 2: 'Média', 3: 'Alta' };
const colors = { 1: '#4CAF50', 2: '#FF9800', 3: '#F44336' };

export default function PriorityBadge({ prioridade }) {
  return (
    <View style={[styles.badge, { backgroundColor: colors[prioridade] || '#999' }]}>
      <Text style={styles.text}>{labels[prioridade] || '?'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
});