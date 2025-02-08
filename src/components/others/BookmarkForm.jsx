import React, { useState } from "react";
import { Card, Textarea, Select, TextInput, Button, ActionIcon, Tooltip, Avatar, Box, Group } from "@mantine/core";
import { IconHeart, IconBell, IconFolder, IconSearch, IconPlus } from "@tabler/icons-react";

const BookmarkForm = () => {
    const [note, setNote] = useState("");
    const [tags, setTags] = useState("");
    const [collection, setCollection] = useState("Unsorted");
    const [isFavorite, setIsFavorite] = useState(false);
    const [notifications, setNotifications] = useState(false);

    return (
        <Card
            shadow="sm"
            radius="md"
            withBorder
            style={{
                backgroundColor: "#1d1e1f",
                color: "#e5e5e6",
                maxWidth: "350px",
                padding: "16px",
            }}
        >
            {/* Header */}
            <Group position="apart">
                <TextInput value="New" readOnly variant="unstyled" size="sm" style={{ fontSize: "18px", fontWeight: 600 }} />
                <Tooltip label="Search">
                    <ActionIcon variant="transparent">
                        <IconSearch size={18} />
                    </ActionIcon>
                </Tooltip>
            </Group>

            {/* Bookmark Title & Thumbnail */}
            <Group mt="md">
                <Avatar radius="sm" size="xl" variant="outline" color="gray" />
                <Box>
                    <TextInput
                        value="New Tab"
                        readOnly
                        variant="unstyled"
                        size="sm"
                        style={{ fontSize: "16px", fontWeight: 500 }}
                    />
                </Box>
            </Group>

            {/* Note Input */}
            <Textarea
                placeholder="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                minRows={3}
                variant="filled"
                mt="md"
                style={{
                    backgroundColor: "#2a2b2c",
                    border: "1px solid #3a3b3c",
                    color: "#e5e5e6",
                }}
            />

            {/* Collection Dropdown */}
            <Select
                data={["Unsorted", "Work", "Personal", "Reading"]}
                value={collection}
                onChange={setCollection}
                mt="md"
                leftSection={<IconFolder size={16} />}
                variant="filled"
                style={{ backgroundColor: "#2a2b2c", border: "1px solid #3a3b3c" }}
            />

            {/* Tags Input */}
            <TextInput
                placeholder="Add tags..."
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                mt="md"
                variant="filled"
                style={{
                    backgroundColor: "#2a2b2c",
                    border: "1px solid #3a3b3c",
                    color: "#e5e5e6",
                }}
            />

            {/* URL Field */}
            <TextInput
                value="chrome://newtab/"
                readOnly
                mt="md"
                variant="filled"
                style={{
                    backgroundColor: "#2a2b2c",
                    border: "1px solid #3a3b3c",
                    color: "#e5e5e6",
                }}
            />

            {/* Action Icons */}
            <Group mt="md" spacing="md">
                <Tooltip label="Favorite">
                    <ActionIcon
                        color={isFavorite ? "red" : "gray"}
                        variant="outline"
                        onClick={() => setIsFavorite(!isFavorite)}
                    >
                        <IconHeart size={18} />
                    </ActionIcon>
                </Tooltip>

                <Tooltip label="Notifications">
                    <ActionIcon
                        color={notifications ? "blue" : "gray"}
                        variant="outline"
                        onClick={() => setNotifications(!notifications)}
                    >
                        <IconBell size={18} />
                    </ActionIcon>
                </Tooltip>
            </Group>

            {/* Footer Actions */}
            <Group mt="md" position="apart">
                <Button variant="subtle" leftSection={<IconPlus size={16} />} color="gray">
                    Tabs
                </Button>
                <Button variant="subtle" color="gray">
                    Highlights
                </Button>
                <Button color="yellow">Save</Button>
            </Group>
        </Card>
    );
};

export default BookmarkForm;
