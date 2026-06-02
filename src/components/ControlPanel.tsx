import { SeatType } from "../models/Seat";

interface ControlPanelProps {
    groupSize: number;
    seatType: SeatType;
    onGroupSizeChange: (size: number) => void;
    onSeatTypeChange: (type: SeatType) => void;
    onAutoAllocate: () => void;
}

function ControlPanel({
    groupSize,
    seatType,
    onGroupSizeChange,
    onSeatTypeChange,
    onAutoAllocate,
}: ControlPanelProps) {
    return (
        <div
            style={{
                marginBottom: "20px",
                display: "flex",
                gap: "16px",
                alignItems: "center",
            }}
        >
            <div>
                <label>Group Size: </label>

                <input
                    type="number"
                    min={1}
                    max={10}
                    value={groupSize}
                    onChange={(e) =>
                        onGroupSizeChange(Number(e.target.value))
                    }
                />
            </div>

            <div>
                <label>Seat Type: </label>

                <select
                    value={seatType}
                    onChange={(e) =>
                        onSeatTypeChange(
                            e.target.value as typeof seatType
                        )
                    }
                >
                    <option value={SeatType.STANDARD}>
                        Standard
                    </option>

                    <option value={SeatType.VIP}>
                        VIP
                    </option>

                    <option value={SeatType.ACCESSIBILITY}>
                        Accessibility
                    </option>
                </select>
            </div>

            <button onClick={onAutoAllocate}>
                Auto Allocate
            </button>
        </div>
    );
}

export default ControlPanel;