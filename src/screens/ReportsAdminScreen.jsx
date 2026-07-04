import React, { useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StatusBar, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import StatusBadge from '../components/StatusBadge';
import BottomTabBar from '../components/BottomTabBar';

// ---------------------------------------------------------------------------
// DEMO DATA — swap these out for real data once the backend is wired up.
// ---------------------------------------------------------------------------
const OVERVIEW = [
  { label: 'Total\nMissions',   value: '128', icon: 'flag-outline',             color: colors.tabActive },
  { label: 'Completed',         value: '104', icon: 'checkmark-circle-outline', color: colors.delivered ?? colors.tabActive },
  { label: 'Active\nNow',       value: '6',   icon: 'pulse-outline',            color: colors.accepted },
  { label: 'Cancelled',         value: '18',  icon: 'close-circle-outline',     color: colors.danger },
];

const SECONDARY = [
  { label: 'Volunteers',       value: '42' },
  { label: 'Avg. Response',    value: '27 min' },
  { label: 'Completion Rate',  value: '81%' },
];

const MONTHLY = [
  { month: 'Feb', missions: 12 },
  { month: 'Mar', missions: 15 },
  { month: 'Apr', missions: 19 },
  { month: 'May', missions: 22 },
  { month: 'Jun', missions: 28 },
  { month: 'Jul', missions: 32 },
];

const RECENT = [
  { id: 'M1287', animal: 'Injured Owl',   location: 'Batroun, North Lebanon',  status: 'Delivered' },
  { id: 'M1284', animal: 'Sea Turtle',    location: 'Tyre, South Lebanon',     status: 'Delivered' },
  { id: 'M1291', animal: 'Trapped Fox',   location: 'Akkar, North Lebanon',    status: 'On the way' },
  { id: 'M1279', animal: 'Wild Boar',     location: 'Chouf Forest',            status: 'Delivered' },
  { id: 'M1275', animal: 'Injured Deer',  location: 'Bekaa Valley',            status: 'Cancelled' },
];

function BarChart({ data }) {
  const max = useMemo(() => Math.max(...data.map((d) => d.missions)), [data]);
  return (
    <View style={styles.chartRow}>
      {data.map((d) => (
        <View key={d.month} style={styles.barColumn}>
          <View style={styles.barTrack}>
            <View
              style={[
                styles.barFill,
                { height: `${Math.max((d.missions / max) * 100, 6)}%` },
              ]}
            />
          </View>
          <Text style={styles.barValue}>{d.missions}</Text>
          <Text style={styles.barLabel}>{d.month}</Text>
        </View>
      ))}
    </View>
  );
}

export default function ReportsAdminScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Reports</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="download-outline" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Overview grid */}
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.overviewGrid}>
          {OVERVIEW.map((item) => (
            <View key={item.label} style={styles.overviewCard}>
              <Ionicons name={item.icon} size={22} color={item.color} />
              <Text style={[styles.overviewNum, { color: item.color }]}>{item.value}</Text>
              <Text style={styles.overviewLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Secondary stats */}
        <View style={styles.secondaryRow}>
          {SECONDARY.map((s) => (
            <View key={s.label} style={styles.secondaryCard}>
              <Text style={styles.secondaryValue}>{s.value}</Text>
              <Text style={styles.secondaryLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Monthly chart */}
        <Text style={styles.sectionTitle}>Missions per Month</Text>
        <View style={styles.chartCard}>
          <BarChart data={MONTHLY} />
        </View>

        {/* Recent missions */}
        <Text style={styles.sectionTitle}>Recent Missions</Text>
        <View style={styles.recentCard}>
          {RECENT.map((m, idx) => (
            <View
              key={m.id}
              style={[styles.recentRow, idx < RECENT.length - 1 && styles.recentRowBorder]}
            >
              <View style={styles.recentInfo}>
                <Text style={styles.recentAnimal}>{m.animal}</Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={12} color={colors.textSecondary} />
                  <Text style={styles.recentLocation}>{m.location}</Text>
                </View>
              </View>
              <StatusBadge status={m.status} small />
            </View>
          ))}
        </View>

        <View style={{ height: 16 }} />
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab="Admin" />
    </SafeAreaView>
  );
}

