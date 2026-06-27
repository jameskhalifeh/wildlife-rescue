import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { missionTrackingStyles as styles } from '../theme/styles';
import StatusBadge from '../components/StatusBadge';
import BottomTabBar from '../components/BottomTabBar';
import { useAuth } from '../context/AuthContext';

const STEPS = [
  { label: 'Accepted',   sub: null,                    time: '10:24 AM', done: true },
  { label: 'Picked up',  sub: 'Batroun, North Lebanon', time: '10:42 AM', done: true },
  { label: 'On the way', sub: 'En route to LWRC Center', time: '10:45 AM', done: false, active: true },
  { label: 'Delivered',  sub: 'LWRC Center',            time: '--',       done: false },
];

function MockMap() {
  return (
    <View style={styles.mapWrapper}>
      {/* Map background */}
      <View style={styles.mapBg}>
        {/* Grid roads */}
        <View style={[styles.road, { top: '25%', left: 0, right: 0, height: 2 }]} />
        <View style={[styles.road, { top: '55%', left: 0, right: 0, height: 2 }]} />
        <View style={[styles.road, { top: '80%', left: 0, right: 0, height: 2 }]} />
        <View style={[styles.road, { left: '20%', top: 0, bottom: 0, width: 2 }]} />
        <View style={[styles.road, { left: '55%', top: 0, bottom: 0, width: 2 }]} />
        <View style={[styles.road, { left: '80%', top: 0, bottom: 0, width: 2 }]} />

        {/* Route: horizontal leg then vertical leg */}
        <View style={styles.routeH} />
        <View style={styles.routeV} />

        {/* Origin dot (blue) */}
        <View style={styles.originRing}>
          <View style={styles.originDot} />
        </View>

        {/* Destination pin (red) */}
        <View style={styles.destPinWrap}>
          <View style={styles.destPinHead} />
          <View style={styles.destPinTail} />
        </View>
      </View>

      {/* ETA / Distance bar */}
      <View style={styles.etaBar}>
        <View style={styles.etaItem}>
          <Text style={styles.etaLabel}>ETA</Text>
          <Text style={styles.etaValue}>11:40 AM</Text>
        </View>
        <View style={styles.etaDivider} />
        <View style={styles.etaItem}>
          <Text style={styles.etaLabel}>Distance</Text>
          <Text style={styles.etaValue}>18 km</Text>
        </View>
      </View>
    </View>
  );
}

export default function MissionTrackingScreen({ navigation }) {
  const { auth } = useAuth();
  const isAdmin = auth.role === 'admin';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Mission Tracking</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="call-outline" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Mission Card — tap to view full details */}
        <TouchableOpacity
          style={styles.missionCard}
          onPress={() => navigation.navigate('MissionDetails')}
          activeOpacity={0.75}
        >
          <View style={styles.cardPhotoWrap}>
            <Text style={styles.cardEmoji}>🦉</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardAnimal}>Injured Owl</Text>
            <Text style={styles.cardId}>Mission ID: #M1287</Text>
          </View>
          <StatusBadge status="On the way" small />
        </TouchableOpacity>

        {/* Timeline */}
        <View style={styles.timeline}>
          {STEPS.map((step, idx) => {
            const isLast = idx === STEPS.length - 1;
            const dotColor = step.done
              ? colors.timelineDone
              : step.active
              ? colors.timelineActive
              : colors.timelinePending;
            return (
              <View key={step.label} style={styles.timelineRow}>
                {/* Dot + line column */}
                <View style={styles.dotColumn}>
                  <View style={[styles.dot, { backgroundColor: dotColor },
                    step.active && styles.dotActive]}>
                    {(step.done && !step.active) && (
                      <Ionicons name="checkmark" size={10} color="#fff" />
                    )}
                    {step.active && <View style={styles.dotInner} />}
                  </View>
                  {!isLast && (
                    <View style={[styles.line, { backgroundColor: step.done ? colors.timelineDone : colors.timelineLine }]} />
                  )}
                </View>

                {/* Content */}
                <View style={styles.stepContent}>
                  <Text style={[styles.stepLabel, !step.done && !step.active && styles.stepMuted]}>
                    {step.label}
                  </Text>
                  {step.sub && (
                    <Text style={styles.stepSub}>{step.sub}</Text>
                  )}
                </View>

                {/* Time */}
                <Text style={[styles.stepTime, !step.done && !step.active && styles.stepMuted]}>
                  {step.time}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Mock Map */}
        <MockMap />

        {/* Only admin can mark a mission complete */}
        {isAdmin && (
          <TouchableOpacity
            style={styles.deliverBtn}
            onPress={() => navigation.navigate('MissionCompleted')}
            activeOpacity={0.85}
          >
            <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
            <Text style={styles.deliverBtnText}>Mark Mission Complete</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 16 }} />
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab={isAdmin ? 'Dashboard' : 'My Mission'} />
    </SafeAreaView>
  );
}

