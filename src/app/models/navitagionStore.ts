import { EquipmentType } from '@app/models/equipment';
import { ShipSlotNavigation } from '@app/models/navigation';
import { HullType } from '@app/models/ship';

export interface NavigationState {
  hullType: HullType;
  equipmentType: EquipmentType | EquipmentType[];
  selectedEquipmentType: EquipmentType;
  slot: ShipSlotNavigation;
}
