import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import BottomTabBar from '../components/BottomTabBar';
import { reportsStyles as styles } from '../theme/styles';

const FILTERS = ['This Week', 'This Month', 'This Year'];

const DATA_BY_PERIOD = {
  'This Week': {
    stats: [
      { label: 'Total Rescues', value: '142', icon: 'paw-outline', color: colors.tabActive },
      { label: 'Active Volunteers', value: '34', icon: 'people-outline', color: colors.accepted },
      { label: 'Success Rate', value: '94%', icon: 'trending-up-outline', color: colors.high },
    ],
    chart: [
      { label: 'Mon', value: 30 }, { label: 'Tue', value: 45 }, { label: 'Wed', value: 80 },
      { label: 'Thu', value: 65 }, { label: 'Fri', value: 50 }, { label: 'Sat', value: 90 }, { label: 'Sun', value: 70 },
    ],
    reports: [
      { id: 1, title: 'Weekly Rescue Summary', date: 'Jul 4, 2026', type: 'PDF', icon: 'document-text' },
      { id: 2, title: 'Chart Stats', date:'Weeks.' , type: 'CSV', icon: 'stats-chart' },
      { id: 3, title: 'Volunteer Activity', date: 'Jul 3, 2026', type: 'XLS', icon: 'time' },
      
    ]
  },
  'This Month': {
    stats: [
      { label: 'Total Rescues', value: '520', icon: 'paw-outline', color: colors.tabActive },
      { label: 'Active Volunteers', value: '42', icon: 'people-outline', color: colors.accepted },
      { label: 'Success Rate', value: '96%', icon: 'trending-up-outline', color: colors.high },
    ],
    chart: [
      { label: 'Wk 1', value: 70 }, { label: 'Wk 2', value: 85 }, { label: 'Wk 3', value: 60 }, { label: 'Wk 4', value: 95 },
    ],
    reports: [
      { id: 4, title: 'June Monthly Report', date: 'Jul 1, 2026', type: 'PDF', icon: 'document-text' },
      { id: 5, title: 'Chart Stats',date:'Months.',type: 'CSV', icon: 'stats-chart' },
      { id: 6, title: 'Monthly Volunteer Hours', date: 'Jun 30, 2026', type: 'XLS', icon: 'time' },
    ]
  },
  'This Year': {
    stats: [
      { label: 'Total Rescues', value: '2,400', icon: 'paw-outline', color: colors.tabActive },
      { label: 'Active Volunteers', value: '58', icon: 'people-outline', color: colors.accepted },
      { label: 'Success Rate', value: '92%', icon: 'trending-up-outline', color: colors.high },
    ],
    chart: [
      { label: 'Q1', value: 60 }, { label: 'Q2', value: 80 }, { label: 'Q3', value: 70 }, { label: 'Q4', value: 90 },
    ],
    reports: [
      { id: 7, title: '2026 Q1 Summary', date: 'Apr 1, 2026', type: 'PDF', icon: 'document-text' },
      { id: 8, title: 'Chart Stats', date: 'Year.', type: 'CSV', icon: 'stats-chart' },
      { id: 9, title: 'Annual Performance', date: 'Jan 15, 2026', type: 'XLS', icon: 'time' },
      
    ]
  }
};

export default function ReportsScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('This Week');
  const currentData = DATA_BY_PERIOD[activeFilter];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Reports & Analytics</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="download-outline" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Filters */}
        <View style={styles.filterRow}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterTab, activeFilter === f && styles.filterTabActive]}
              onPress={() => setActiveFilter(f)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {currentData.stats.map((s) => (
            <View key={s.label} style={styles.statCard}>
              <View style={[styles.iconWrap, { backgroundColor: s.color + '22' }]}>
                <Ionicons name={s.icon} size={18} color={s.color} />
              </View>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.sectionTitle}>Rescue Chart</Text>
          <View style={styles.chartContainer}>
            {currentData.chart.map((col, idx) => (
              <View key={idx} style={styles.barColumn}>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { height: `${col.value}%` }]} />
                </View>
                <Text style={styles.barLabel}>{col.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Dynamic Generated Reports */}
        <Text style={[styles.sectionTitle, { marginBottom: 12, marginTop: 8 }]}>Generated Reports</Text>
        {currentData.reports.map((report) => (
          <TouchableOpacity key={report.id} style={styles.reportCard} activeOpacity={0.75}>
            <View style={styles.reportIconWrap}>
              <Ionicons name={report.icon} size={24} color={colors.tabActive} />
            </View>
            <View style={styles.reportInfo}>
              <Text style={styles.reportTitle}>{report.title}</Text>
              <View style={styles.reportMeta}>
                <Ionicons name="calendar-outline" size={12} color={colors.textSecondary} />
                <Text style={styles.reportDate}>{report.date}</Text>
              </View>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{report.type}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab="Reports" />
    </SafeAreaView>
  );
}