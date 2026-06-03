import { SeatType } from "../models/Seat";

interface ControlPanelProps {
    groupSize: number;

    seatType: SeatType;

    adminOverride: boolean;

    onAdminOverrideChange: (
        value: boolean
    ) => void;

    onGroupSizeChange: (
        value: number
    ) => void;

    onSeatTypeChange: (
        value: SeatType
    ) => void;

    onAutoAllocate: () => void;
}

function ControlPanel({
    groupSize,
    seatType,
    adminOverride,
    onAdminOverrideChange,
    onGroupSizeChange,
    onSeatTypeChange,
    onAutoAllocate,
}: ControlPanelProps) {
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "18px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                <label
                    style={{
                        fontWeight: "600",
                    }}
                >
                    Group Size:
                </label>

                <input
                    type="number"
                    min={1}
                    max={7}
                    value={groupSize}
                    onChange={(e) =>
                        onGroupSizeChange(
                            Number(e.target.value)
                        )
                    }
                    style={{
                        width: "70px",
                        padding: "8px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                    }}
                />
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                <label
                    style={{
                        fontWeight: "600",
                    }}
                >
                    Seat Type:
                </label>

                <select
                    value={seatType}
                    onChange={(e) =>
                        onSeatTypeChange(
                            e.target.value as SeatType
                        )
                    }
                    style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                    }}
                >
                    <option value={SeatType.STANDARD}>
                        Standard
                    </option>

                    <option value={SeatType.VIP}>
                        VIP
                    </option>

                    <option
                        value={
                            SeatType.ACCESSIBILITY
                        }
                    >
                        Accessibility
                    </option>
                </select>
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                <input
                    type="checkbox"
                    checked={adminOverride}
                    onChange={(e) =>
                        onAdminOverrideChange(
                            e.target.checked
                        )
                    }
                    style={{
                        width: "18px",
                        height: "18px",
                        cursor: "pointer",
                    }}
                />

                <label
                    style={{
                        fontWeight: "600",
                    }}
                >
                    Admin Override
                </label>
            </div>

            <button
                onClick={onAutoAllocate}
                style={{
                    padding: "10px 18px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#3498db",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "15px",
                }}
            >
                Auto Allocate
            </button>
        </div>
    );
}

export default ControlPanel;