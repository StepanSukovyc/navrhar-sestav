// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

namespace Gordic.General
{
    /// <summary>
    /// Identifies a logging event. The primary identifier is the "Id" property, with the "Name" property providing a short description of this type of event.
    /// </summary>
    public readonly struct GEventId
    {
        /// <summary>
        /// Implicitly creates an GEventId from the given <see cref="int"/>.
        /// </summary>
        /// <param name="i">The <see cref="int"/> to convert to an GEventId.</param>
        public static implicit operator GEventId(int i)
        {
            return new GEventId(i);
        }

#if MS_EXTENSIONS_LOGGING
        /// <summary>
        /// Implicitly creates an GEventId from the given <see cref="Microsoft.Extensions.Logging.EventId"/>.
        /// </summary>
        /// <param name="eventId">The <see cref="Microsoft.Extensions.Logging.EventId"/> to convert to an GEventId.</param>
        public static implicit operator GEventId(Microsoft.Extensions.Logging.EventId eventId)
        {
            return new GEventId(eventId.Id, eventId.Name) { };
        }
#endif

        /// <summary>
        /// Checks if two specified <see cref="GEventId"/> instances have the same value. They are equal if they have the same Id.
        /// </summary>
        /// <param name="left">The first <see cref="GEventId"/>.</param>
        /// <param name="right">The second <see cref="GEventId"/>.</param>
        /// <returns><code>true</code> if the objects are equal.</returns>
        public static bool operator ==(GEventId left, GEventId right)
        {
            return left.Equals(right);
        }

        /// <summary>
        /// Checks if two specified <see cref="GEventId"/> instances have different values.
        /// </summary>
        /// <param name="left">The first <see cref="GEventId"/>.</param>
        /// <param name="right">The second <see cref="GEventId"/>.</param>
        /// <returns><code>true</code> if the objects are not equal.</returns>
        public static bool operator !=(GEventId left, GEventId right)
        {
            return !left.Equals(right);
        }

        /// <summary>
        /// Initializes an instance of the <see cref="GEventId"/> struct.
        /// </summary>
        /// <param name="id">The numeric identifier for this event.</param>
        /// <param name="name">The name of this event.</param>
        public GEventId(int id, string name = null)
        {
            Id = id;
            Name = name;
        }

        /// <summary>
        /// Gets the numeric identifier for this event.
        /// </summary>
        public int Id { get; }

        /// <summary>
        /// Gets the name of this event.
        /// </summary>
        public string Name { get; }

        /// <inheritdoc />
        public override string ToString()
        {
            return Name ?? Id.ToString();
        }

        /// <summary>
        /// Indicates whether the current object is equal to another object of the same type. Two events are equal if they have the same id.
        /// </summary>
        /// <param name="other">An object to compare with this object.</param>
        /// <returns><code>true</code> if the current object is equal to the other parameter; otherwise, <code>false</code>.</returns>
        public bool Equals(GEventId other)
        {
            return Id == other.Id;
        }

        /// <inheritdoc />
        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj))
            {
                return false;
            }

            return obj is GEventId eventId && Equals(eventId);
        }

        /// <inheritdoc />
        public override int GetHashCode()
        {
            return Id;
        }
    }
}
